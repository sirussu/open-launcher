import { nanoid } from 'nanoid'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { NOTIFICATION_TITLE, REMOVE_NOTIFICATION_TIMEOUT } from '@/constants'
import { modulesFactory } from '@/utils/modulesFactory'
import { i18n as i18nModule } from '@/modules/i18n'
import type { INotification } from '@/types/notification'

import { IRootState } from '../types'

export interface INotificationState {
  notifications: Array<INotification>
}

const state: INotificationState = {
  notifications: [],
}

const mutations: MutationTree<INotificationState> = {
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
  addNotification(state, notification) {
    state.notifications.push(notification)
  },
  removeNotificationById(state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    )
  },
}

export interface INotificationActions
  extends ActionTree<INotificationState, IRootState> {
  addNotification: (
    ctx: ActionContext<INotificationState, IRootState>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: { i18n?: string } & INotification
  ) => void
  removeNotification: (
    ctx: ActionContext<INotificationState, IRootState>,
    id: string
  ) => void
}

const actions: INotificationActions = {
  addNotification(
    { commit, dispatch },
    { type, text, withSystemNotification, payload, i18n }
  ) {
    // @ts-ignore
    text = i18n ? i18nModule.t(`notification.${i18n}`) : text

    const newNotification = {
      id: nanoid(),
      type,
      text,
      withSystemNotification,
      payload,
    }

    commit('addNotification', newNotification)

    if (withSystemNotification) {
      const systemNotification = new Notification(NOTIFICATION_TITLE, {
        body: text,
      })

      systemNotification.onclick = () => {
        dispatch('removeNotification')
      }
    }

    setTimeout(() => {
      dispatch('removeNotification', newNotification.id)
    }, REMOVE_NOTIFICATION_TIMEOUT)
  },
  removeNotification({ commit }, id) {
    commit('removeNotificationById', id)
  },
}

export interface INotificationGetters
  extends GetterTree<INotificationState, IRootState> {
  notifications: (state: INotificationState) => Array<INotification>
  getNotification: (
    state: INotificationState
  ) => (id: string) => INotification | undefined
  getNotificationPayload: (
    state: INotificationState
  ) => (id: string) => INotification['payload'] | null
}

const getters: INotificationGetters = {
  notifications: (state) => state.notifications,
  getNotification: (state) => (id) =>
    state.notifications.find(({ id: _id }) => id === _id),
  getNotificationPayload: (state) => (id) => {
    const notification = state.notifications.find(({ id: _id }) => id === _id)

    return notification ? notification.payload : null
  },
}

export const notificationModule = modulesFactory<
  INotificationState,
  IRootState
>({
  state,
  mutations,
  actions,
  getters,
})
