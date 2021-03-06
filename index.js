const { MigrationError } = require('ley/lib/util'); // changed this line
const TEXT = require('ley/lib/text'); // changed this line

exports.connect = async function (opts={}) {
	const mysql = require('mysql2/promise');
	return mysql.createConnection(opts);
}

exports.setup = async function (client) {
	await client.query(TEXT.table);
	const [rows] = await client.query(TEXT.exists);
	return rows;
};

exports.loop = async function (client, files, method) {
	try {
		await client.query('START TRANSACTION;');

		for (const obj of files) {
			const file = await import('file:///' + obj.abs); // changed this line
			if (typeof file[method] === 'function') {
				await Promise.resolve(file[method](client)).catch(err => {
					throw new MigrationError(err, obj);
				});
			}
			if (method === 'up') {
				await client.query('insert into migrations (name,created_at) values (?,now());', [obj.name]);
			} else if (method === 'down') {
				await client.query('delete from migrations where name = ?;', [obj.name]);
			}
		}

		await client.query('COMMIT;');
	} catch (err) {
		await client.query('ROLLBACK;');
		throw err;
	}
}

exports.end = async function (client) {
	client.destroy();
}
