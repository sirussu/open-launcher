<template>
  <v-container align="center">
    <v-row align="center">
      <v-carousel
        v-model="currentSlideIndex"
        :next-icon="nextIcon"
        :prev-icon="pervIcon"
        hide-delimiters
      >
        <feed-card v-for="feed in feeds" :feed="feed" :key="feed.id" />
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

import FeedCard from '@/views/feeds/FeedCard.vue'
import { IFeedState, IFeedsGetters, IFeedsActions } from '@/store/modules/feeds'

const { useActions, useGetters } = createNamespacedHelpers<
  IFeedState,
  IFeedsGetters,
  IFeedsActions
>('feeds')

export default defineComponent({
  components: {
    FeedCard,
  },
  name: 'FeedsBlock',
  setup() {
    const currentSlideIndex = ref(0)
    const { getFeeds } = useActions(['getFeeds'])
    const { feeds } = useGetters(['feeds'])

    getFeeds()

    return {
      feeds,
      currentSlideIndex,
    }
  },
  computed: {
    nextIcon() {
      // @ts-ignore
      return this.feeds.length - 1 > this.currentSlideIndex && '$next'
    },
    pervIcon() {
      return this.currentSlideIndex !== 0 && '$prev'
    },
  },
})
</script>
