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
    expect(storage.getItem('app')).toBeUndefined()
    expect(storage.__store).toStrictEqual({})
  })

  it('correct data restore', () => {
    localStorage.setItem(
      storage.STORAGE_KEY,
      JSON.stringify({ app: { test: 'value' } })
    )
    storage.load()
    expect(storage.getItem('app')).toStrictEqual({ test: 'value' })
  })

  it('data should not be reloaded', () => {
    expect(storage.getItem('app')).toBeUndefined()
    localStorage.setItem(
      storage.STORAGE_KEY,
      JSON.stringify({ app: { test: 'value' } })
    )
    storage.load()
    expect(storage.getItem('app')).toBeUndefined()
  })

  it('hard reload data', () => {
    expect(storage.getItem('app')).toBeUndefined()
    localStorage.setItem(
      storage.STORAGE_KEY,
      JSON.stringify({ app: { test: 'value' } })
    )
    storage.reload()
    expect(storage.getItem('app')).toStrictEqual({ test: 'value' })
  })

  it('lazy load', () => {
    localStorage.setItem(
      storage.STORAGE_KEY,
      JSON.stringify({ app: { test: 'value' } })
    )
    expect(storage.getItem('app')).toStrictEqual({ test: 'value' })
  })

  it('storing data inside object', () => {
    storage.setItem('app', { test: 'value1' })
    expect(storage.getItem('app')).toStrictEqual({ test: 'value1' })
  })

  it('clear data inside object', () => {
    storage.setItem('app', { test: 'value1' })
    expect(storage.getItem('app')).toStrictEqual({ test: 'value1' })
    storage.clear()
    expect(storage.getItem('app')).toBeUndefined()
  })

  it('save should be called after debounce timeout', async () => {
    storage.setItem('app', { test: 'value1' })

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toBeUndefined()

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 600))

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toStrictEqual(
      JSON.stringify({ app: { test: 'value1' } })
    )
  })

  it('flush to storage with debounce', async () => {
    storage.setItem('app', { test: 'value' })
    storage.setItem('app', { test: 'value0' })
    storage.setItem('app', { test: 'value1' })

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toBeUndefined()

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 600))

    storage.setItem('app', { test: 'value1' })

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 600))

    expect(localStorage.setItem).toHaveBeenCalledTimes(2)

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toStrictEqual(
      JSON.stringify({ app: { test: 'value1' } })
    )
  })

  it('force save ignore debounce', async () => {
    storage.setItem('app', { test: 'value1' })

    storage.forceSave()

    expect(localStorage.__STORE__[storage.STORAGE_KEY]).toStrictEqual(
      JSON.stringify({ app: { test: 'value1' } })
    )
  })
})
