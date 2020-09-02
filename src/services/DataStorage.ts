import _ from 'lodash'

/**
 * Store user data to storage
 */
export default class DataStorage {
  __store = {}
  isLoaded = false
  STORAGE_KEY = 'user_data'
  _debouncer = _.noop

  /**
   * Write user data
   *
   * @param {String} key - key
   * @param {Object} value - json object
   */
  setItem (key, value) {
    this.load()
    this.__store[key] = value
    this.save()
  }

  /**
   * Gets user data
   *
   * @param {String} key
   * @return {Object}
   */
  getItem (key) {
    this.load()
    return this.__store[key]
  }

  clear () {
    this.__store = {}
    this.forceSave()
  }

  /**
   * Save date to storage with debounce
   */
  save () {
    if (!this._debouncer) {
      this._debouncer = _.debounce(() => {
        this._saveToStorage()
      }, 500, { maxWait: 2500 })
    }

    this._debouncer()
  }

  /**
   * Load data from storage if not loaded
   */
  load () {
    if (!this.isLoaded) {
      const data = localStorage.getItem(this.STORAGE_KEY)
      if (data) {
        this.__store = JSON.parse(data)
      }
      this.isLoaded = true
    }
  }

  /**
   * Clean store and reload data
   */
  reload () {
    this.isLoaded = false
    this.__store = {}
    this.load()
  }

  forceSave () {
    this._debouncer = _.noop
    return this._saveToStorage()
  }

  _saveToStorage () {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.__store))
  }
}
