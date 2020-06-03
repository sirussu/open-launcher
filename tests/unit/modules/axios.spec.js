it('has right adapter', () => {
  const axios = require('@/modules/axios')
  expect(axios.default.defaults.adapter.name).toBe('httpAdapter')
})
