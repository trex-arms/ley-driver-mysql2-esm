# ley-driver-mysql2-esm

ESM-compatible mysql2 driver for [@lukeed/ley](https://github.com/lukeed/ley)

### how is it different?

instead of your migration looking like this...
```js
const whatever = require('whatever')

exports.up = async client => {
	// ...
}
exports.down = async client => {
	// ...
}
```
...you can now write your exports like this...

```js
import whatever from 'whatever'

export const up = async client => {
	// ...
}
export const down = async client => {
	// ...
}
```

✨✨awesome✨✨


### how?

```sh
npm install ley --save    # if not installed yet
npm install mysql2 --save # if not installed yet
npm install @trex-arms/ley-driver-mysql2-esm --save
```
> **Important:** `ley` and `mysql2` must be installed separately. That way, you control which versions you want to use.

----------

Then, toss this `driver` param into your `ley.config.js`:
```js
{
	driver: require('@trex-arms/ley-driver-mysql2-esm'),
	// ...
}
```
Or include the driver [another way](https://github.com/lukeed/ley#drivers).


### license/credit

[MIT](https://choosealicense.com/licenses/mit)

Original copyright: Luke Edwards 2021

The code was copied from:
https://github.com/lukeed/ley/blob/master/lib/clients/mysql2.js
