export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
    document.title = `Count: ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter - 1))
  setCounter(0)
}
