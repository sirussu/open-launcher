<template>
  <v-card>
    <v-img :src="image" />
    <v-card-title class="text-break">{{ feed.title }}</v-card-title>
    <v-divider />
    <v-card-actions>
      <v-btn text @click.prevent.stop="openLink(forumLink)">
        {{ $t('feeds.to_forum') }}
      </v-btn>
    </v-card-actions>
    <v-spacer />
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { openLink } from '@/utils/openLink'
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
  },
  methods: {
    openLink,
  },
})
</script>
