<template>
  <div>
    <ul>
      <li v-for="feed in feeds" :key="feed.id">{{ feed.id }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'

import { IFeedState, IFeedsGetters, IFeedsActions } from '@/store/modules/feeds'

const { useActions, useGetters } = createNamespacedHelpers<
  IFeedState,
  IFeedsGetters,
  IFeedsActions
>('feeds')

export default {
  name: 'FeedsBlock',
  setup() {
    const { getFeeds } = useActions(['getFeeds'])
    const { feeds } = useGetters(['feeds'])

    getFeeds()

    return {
      feeds,
    }
  },
}
</script>
