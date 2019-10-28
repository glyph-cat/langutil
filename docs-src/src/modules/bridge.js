let store = {}

export default {
  setItem: (newData) => { store = { ...store, ...newData } },
  getItem: (key) => store[key],
  removeItem: (key) => { delete store[key] },
}
