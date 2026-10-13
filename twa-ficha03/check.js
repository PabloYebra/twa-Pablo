import assert from 'node:assert/strict'
import { byCategory, search, top,total,categories,sortByPrice } from './src/catalog.js'
import { items } from './data.js'


assert.strictEqual(byCategory(items,'book').length, 2)
assert.strictEqual(search(items,'IT').length, 1)
assert.strictEqual(top(items,2).length, 2)
assert.strictEqual(total(items), 169.5)
assert.strictEqual(categories(items).length, 3)


//new tests
 const asc = sortByPrice(items,'asc')
 const desc = sortByPrice(items,'desc')
 assert.strictEqual(asc[0].price, 3.5)
 assert.strictEqual(desc[0].price, 34)