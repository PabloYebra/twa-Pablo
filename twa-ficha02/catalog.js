export const byCategory = (list,cat) =>
    list.filter((i) => i.category === cat);

export const search= (list,text) =>{
    const q = text.toLowerCase()
    return list.filter(({name,tags})=>
        name.toLowerCase().includes(q) || tags.some((t) => t.toLowerCase().includes(q)))

    }
export const total = (list) =>
    list.reduce((sum,{price}) => sum + price,0);

export const top = (list,n) =>
    list.toSorted((a,b) => b.price - a.price).slice(0,n);
export const categories= (list) =>
    [...new Set(list.map(({category}) => category))].toSorted();
export const withDiscount = (list,pct) =>
    list.map((i) => ({...i, price: Math.round(i.price * (-pct/100)*100)/100}));
