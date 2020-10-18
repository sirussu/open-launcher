import { remote } from 'electron'

export const version = () => remote.app.getVersion()
