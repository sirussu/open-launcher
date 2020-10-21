// import { object, number } from '@storybook/addon-knobs'
//
// import StatusBar from '@/views/statusBar/StatusBar.vue'
// import WindowControls from '@/views/statusBar/WindowControls.vue'
//
// import { IRealm } from '@/store/modules/statusBar/types'
//
// export default {
//   title: 'StatusBar',
// }
//
// export const StatusBarText = () => ({
//   components: { StatusBar },
//   props: {
//     sirus: {
//       default: object<IRealm>('sirus', { id: 5, name: "Sirus x10 - 3.3.5а+ ", isOnline: true, online: 48 }, 'realms')
//     },
//     scourge: {
//       default: object<IRealm>('scourge', { id: 9, name: "Scourge x2 - 3.3.5a+", isOnline: true, online: 2050 }, 'realms')
//     },
//     frostmourne: {
//       default: object<IRealm>('frostmourne', { id: 16, name: "Frostmourne x1 - 3.3.5a+", isOnline: true, online: 1836 }, 'realms')
//     },
//     neltharion: {
//       default: object<IRealm>('neltharion', { id: 21, name: "Neltharion x3 - 3.3.5a+", isOnline: true, online: 4740 }, 'realms')
//     },
//     online: {
//       default: number('online', 1002, { min: 0 }, 'summaryOnline'),
//     },
//   },
//   template: '<status-bar :realms="[sirus, scourge, frostmourne, neltharion]" :online="online" />',
// })
//
// export const StatusBarWindowControls = () => ({
//   components: { WindowControls },
//   template: '<window-controls />',
// })
