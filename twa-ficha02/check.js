import assert from 'node:assert/strict'
import { byCategory, search, top,total,categories } from './catalog.js'
import { items } from './data.js'


assert.strictEqual(byCategory(items,'book').length, 2)
assert.strictEqual(search(items,'IT').length, 1)
assert.strictEqual(top(items,2).length, 2)
assert.strictEqual(total(items), 169.5)
assert.strictEqual(categories(items).length, 3)