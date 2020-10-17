
export const getSummaryOnline = <T extends { online: number }>(realms: Array<T>): number => {
  return realms.reduce((online, element) => online + element.online, 0)
}
