import { IAdaptedResponse, IAuthResponse } from '@/store/modules/accounts/types'

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

export const adaptResponse = (authResponse: IAuthResponse, { username, password, token }: { username: string, password: string, token?: string}): IAdaptedResponse => {
  return {
    username: username,
    password: password,
    tfaToken: token,
    tokenIsExpired: false,
    tokenType: authResponse.tokenType,
    accessToken: authResponse.accessToken,
    refreshToken: authResponse.refreshToken,
    expiresIn: authResponse.expiresIn,
  }
}

export const adaptExtendedAccount = (accountInfo: { id: number }, authResponse: IAdaptedResponse) => {
  return {
    id: accountInfo.id,
    byId: {
      tokens: {
        tokenType: authResponse.tokenType,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        expiresIn: authResponse.expiresIn,
      },
      accountInfo,
      id: accountInfo.id,
      username: authResponse.username,
      password: authResponse.password,
      tfaToken: authResponse.tfaToken,
      tokenIsExpired: authResponse.tokenIsExpired,
    },
  }
}
