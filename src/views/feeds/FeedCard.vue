<template>
  <v-carousel-item>
    <v-card>
      <v-img height="250" :src="image" />
      <v-card-title>{{ feed.title }}</v-card-title>
      <v-card-text>
        {{ shortDescription }}
      </v-card-text>
    </v-card>
  </v-carousel-item>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { IFeed } from '@/store/modules/feeds'

interface IFeedCardProps {
  feed: IFeed
}

export default defineComponent<IFeedCardProps>({
  props: {
    feed: Object,
  },
  computed: {
    image() {
      return `http://api.sirus.su${this.feed.coverUrl}`
    },
    forumLink() {
      return `https://forum.sirus.su/threads/${this.feed.forumTopicId}`
    },
    shortDescription() {
      return this.feed.description
    },
  },
})
</script>
