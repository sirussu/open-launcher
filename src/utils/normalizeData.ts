export const normalizeData = <T extends { id: string | number }>(
  data: Array<T>
) =>
  data.reduce(
    (acc, element) => {
      const { id } = element

      acc.allIds.push(id)
      acc.byId[id] = element

      return acc
    },
    {
      allIds: [] as Array<string | number>,
      byId: {} as { [key in string | number]: T },
    }
  )
