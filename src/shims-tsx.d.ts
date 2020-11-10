/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // @ts-ignore
    interface Element extends VNode {}

    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
