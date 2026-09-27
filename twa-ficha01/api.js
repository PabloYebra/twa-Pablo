import {writeFile} from 'node:fs/promises'
const res = await fetch(
'https://api.github.com/repos/nodejs/node',
)
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const repo = await res.json()
console.log(repo.name, repo.stargazers_count)
await writeFile('repo-info.json', JSON.stringify({name: repo.name,stargazers_count: repo.stargazers_count},null,2))