
export const getSummaryOnline = <T extends { online: number }>(realms: Array<T>): number => {
  return realms.reduce((acc, element) => acc + element.online, 0)
}
