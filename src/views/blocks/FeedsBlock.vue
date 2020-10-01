<template>
  <v-container align="center">
    <v-carousel
      v-model="currentSlideIndex"
      :next-icon="nextIcon"
      :prev-icon="pervIcon"
      hide-delimiters
      height="400px"
    >
      <v-carousel-item v-for="(feeds, index) in chunckedFeeds" :key="index">
        <v-row align-content="center">
          <v-col v-for="(feed, _index) in feeds" :key="_index" sm="6" cols="12">
            <feed-card :feed="feed" />
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script lang="ts">
import chunk from 'lodash/chunk'
import { defineComponent, ref } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

import FeedCard from '@/views/feeds/FeedCard.vue'
import {
  IFeedState,
  IFeedsGetters,
  IFeedsActions,
  IFeed,
} from '@/store/modules/feeds'

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
      return this.chunckedFeeds.length - 1 > this.currentSlideIndex && '$next'
    },
    pervIcon() {
      return this.currentSlideIndex !== 0 && '$prev'
    },
    chunckedFeeds() {
      return chunk(this.feeds as Array<IFeed>, 2)
    },
  },
})
</script>
