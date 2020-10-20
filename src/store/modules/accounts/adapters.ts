export const adaptUserDataToRequestParams = ({
  username,
  password,
  token,
}: {
  username: string
  password: string
  token?: string
}) => {
  return {
    username,
    password,
    token,
    grantType: process.env.VUE_APP_GRANT_TYPE,
    clientId: Number(process.env.VUE_APP_CLIENT_ID),
    clientSecret: process.env.VUE_APP_CLIENT_SECRET,
    scope: '*',
  }
}

export const adaptExtendedAccount = (accountInfo, authResponse) => {
  return {
    id: accountInfo.id,
    byId: {
      tokens: authResponse,
      accountInfo,
      id: accountInfo.id,
      username: accountInfo.username,
      password: authResponse.password
    },
  }
}
