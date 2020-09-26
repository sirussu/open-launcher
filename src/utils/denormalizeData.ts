export const denormalizeData = <T extends { id: string | number }>(
  normalizedData: {
    allIds: Array<string | number>
    byId: { [key in string | number]: T }
  } = {
    allIds: [],
    byId: {},
  }
) => normalizedData.allIds.map((id) => normalizedData.byId[id])
