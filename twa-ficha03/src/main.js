import { search, byCategory, categories, sortByPrice } from './catalog.js'

const state = {
  status: 'loading', error: null, items: [],
  query: '', category: '', sortDir: 'desc',
  selectedId: null,
}

const q = document.querySelector('#q')
const select = document.querySelector('#category')
const sortBtn=  document.querySelector('#sortBtn')
const statusEl = document.querySelector('#status')
const list = document.querySelector('#list')
const detail = document.querySelector('#detail')

async function load(){
  state.status='loading'
  state.error = null
  render()
  try{
    const res = await fetch('/items.json')
    if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    state.items = await res.json()
    state.status = 'ready'
  } catch (err) {
    state.error = err.message
    state.status = 'error'
  }finally{
  render()
  }
}

function toLi(item){
  const li = document.createElement('li')
  li.textContent = `${item.name} - ${item.price}`
  li.dataset.id=item.id
  if(item.id === state.selectedId)li.classList.add('selected')
  return li

}

function toDetail(item){
  const box = document.createElement('div')
  const h = document.createElement('h2')
  h.textContent = item.name
  const p = document.createElement('p')
  p.textContent = `precio: ${item.price} €`
  const tags = document.createElement('p')
  tags.textContent = `Tags: ${item.tags.join(', ')}`
  const author = document.createElement('p')
  author.textContent = `Author: ${item.author.name} - ${item.author.value}`
  
  box.append(h,p,tags,author)
  return box
}

function getVisibleItems(){
  const found = search(state.items, state.query)
  const filtered = state.category ? byCategory(found, state.category) : found
  return sortByPrice(filtered, state.sortDir)
}
function render(){

  if(state.status === 'error'){
    statusEl.textContent = `Error: ${state.error}`
    list.replaceChildren()
    detail.replaceChildren()
    return
  }
  if(state.status==='loading'){
    statusEl.textContent = 'Loading... '
    list.replaceChildren()
    detail.replaceChildren()
    return
  }

  const options = ['', ...categories(state.items)].map((c)=>{
    const opt = document.createElement('option')
    opt.value=c
    opt.textContent=c || 'Todas'
    return opt
  })
  select.replaceChildren(...options)
  select.value = state.category

  sortBtn.textContent = state.sortDir === 'desc' ? 'Sort by price (desc)' : 'Sort by price (asc)'
  const visible = getVisibleItems()
  statusEl.textContent = visible.length ===0? 'Sin resultados':''
  list.replaceChildren(...visible.map(toLi))

  const selected = state.items.find((i) => i.id === state.selectedId)
  if(selected){
    detail.replaceChildren(toDetail(selected))
  }else{
    detail.replaceChildren()
  }
}




q.addEventListener('input', (e)=>{
  state.query = e.target.value
  render()
})

select.addEventListener('change', (e)=>{
  state.category = e.target.value
  render()
})

sortBtn.addEventListener('click', (e)=>{
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc'
  render()
})

list.addEventListener('click', (e)=>{
  const li = e.target.closest('li')
  if(!li) return
  state.selectedId = Number(li.dataset.id)
  render()
})
load()