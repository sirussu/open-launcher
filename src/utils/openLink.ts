import electron from 'electron'

export const openLink = (link: string) => electron.shell.openExternal(link)
