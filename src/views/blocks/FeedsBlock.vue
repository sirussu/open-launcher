<template>
  <div class="feed-block">
    <v-container align="center">
      <feeds-skeleton v-if="feeds.length === 0" />
      <v-carousel
        v-else
        v-model="currentSlideIndex"
        :next-icon="nextIcon"
        :prev-icon="pervIcon"
        height="100%"
        hide-delimiters
      >
        <v-carousel-item v-for="(feeds, index) in chunckedFeeds" :key="index">
          <v-row align-content="center">
            <v-col
              v-for="(feed, _index) in feeds"
              :key="_index"
              sm="6"
              mb="8"
              cols="12"
            >
              <feed-card :feed="feed" />
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script lang="ts">
import chunk from 'lodash/chunk'
import { defineComponent, ref } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

import FeedsSkeleton from '@/views/feeds/FeedsSkeleton.vue'
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
    FeedsSkeleton,
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

<style>
.feed-block .v-window__next,
.feed-block .v-window__prev {
  top: 180px !important;
}
</style>
