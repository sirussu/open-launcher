import { remote } from 'electron'

export const minimize = () => remote.getCurrentWindow().minimize()

export const close = () => remote.getCurrentWindow().close()
