import {writeFile} from 'node:fs/promises'
import { items } from './data.js'
import { byCategory, search, top,total,categories } from './catalog.js'
const [cmd, arg] = process.argv.slice(2)
const print = (list) =>
list.forEach(({id,name,price}) => console.log(`${id} ${name} ${price.toFixed(2)}EUR`),)

switch(cmd){
    case undefined:
        print(items)
        break
    case 'search':

        print(search(items,arg ??''))
        break
    case 'top':
        print(top(items,Number(arg ?? 3)))
        break
    case 'report':{
        const report = {
            count: items.length,
            total: total(items),
            categories: categories(items),
            top3:top(items,3),
        }
    await writeFile('report.json',JSON.stringify(report,null,2))
    console.log('Report generated')
    break
}
default:
    print(byCategory(items,cmd))
}