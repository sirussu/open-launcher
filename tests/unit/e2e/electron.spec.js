/**
 * @jest-environment node
 */
import spectron from 'spectron'
import { testWithSpectron } from 'vue-cli-plugin-electron-builder'

describe('Application launch', () => {
  jest.setTimeout(50000)
  it.skip('starts with correct window properties', async () => {
    const { app, stopServe } = await testWithSpectron(spectron)
    const win = app.browserWindow
    const client = app.client

    // Window was created
    expect(await client.getWindowCount()).toBe(1)
    // It is not minimized
    expect(await win.isMinimized()).toBe(false)
    // Window is visible
    expect(await win.isVisible()).toBe(true)
    // Size is correct
    const { width, height } = await win.getBounds()
    expect(width).toBeGreaterThan(0)
    expect(height).toBeGreaterThan(0)

    await stopServe()
  })
})
