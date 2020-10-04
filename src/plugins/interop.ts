/* eslint-disable @typescript-eslint/naming-convention */
import _Vue from 'vue'

import { ElectronInterop, interop } from '@/utils/electronInterop'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function Interop(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$interop = interop
}

declare module 'vue/types/vue' {
  interface Vue {
    $interop: ElectronInterop
  }
}
