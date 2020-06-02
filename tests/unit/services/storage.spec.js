import DataStorage from '@/services/DataStorage'

describe('Storage read/write', () => {
  let storage

  beforeEach(() => {
    storage = new DataStorage()
    localStorage.clear()
    localStorage.setItem.mockClear()
    require('jest-localstorage-mock')
  })

  it('should be empty', () => {
    expect(storage.get('app')).toBeUndefined()
    expect(storage.__store).toStrictEqual({})
  })

  it('correct data restore', () => {
    localStorage.setItem(storage.STORAGE_KEY, JSON.stringify({ app: { test: 'value' } }))
    storage.load()
    expect(storage.get('app')).toStrictEqual({ test: 'value' })
  })

  it('data should not be reloaded', () => {
    expect(storage.get('app')).toBeUndefined()
    localStorage.setItem(storage.STORAGE_KEY, JSON.stringify({ app: { test: 'value' } }))
    storage.load()
    expect(storage.get('app')).toBeUndefined()
  })

  it('hard reload data', () => {
    expect(storage.get('app')).toBeUndefined()
    localStorage.setItem(storage.STORAGE_KEY, JSON.stringify({ app: { test: 'value' } }))
    storage.reload()
    expect(storage.get('app')).toStrictEqual({ test: 'value' })
  })

  it('lazy load', () => {
    localStorage.setItem(storage.STORAGE_KEY, JSON.stringify({ app: { test: 'value' } }))
    expect(storage.get('app')).toStrictEqual({ test: 'value' })
  })

  it('storing data inside object', () => {
    storage.set('app', { test: 'value1' })
    expect(storage.get('app')).toStrictEqual({ test: 'value1' })
  })

  it('save should be called after debounce timeout', async () => {
    storage.set('app', { test: 'value1' })

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toBeUndefined()

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 600))

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toStrictEqual(JSON.stringify({ app: { test: 'value1' } }))
  })

  it('flush to storage with debounce', async () => {
    storage.set('app', { test: 'value' })
    storage.set('app', { test: 'value0' })
    storage.set('app', { test: 'value1' })

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toBeUndefined()

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 600))

    storage.set('app', { test: 'value1' })

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 600))

    expect(localStorage.setItem).toHaveBeenCalledTimes(2)

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toStrictEqual(JSON.stringify({ app: { test: 'value1' } }))
  })

  it('force save ignore debounce', async () => {
    storage.set('app', { test: 'value1' })

    storage.forceSave()

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toStrictEqual(JSON.stringify({ app: { test: 'value1' } }))
  })
})
