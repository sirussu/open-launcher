import { text, number } from '@storybook/addon-knobs'

import FeedCard from '@/views/feeds/FeedCard.vue'

export default {
  title: 'FeedCard',
}

export const exampleWithKnobs = () => ({
  components: { FeedCard },
  props: {
    coverUrl: {
      default: text('coverUrl', '/uploads/news/nl3.jpg', 'feed'),
    },
    forumTopicId: {
      default: number('forumTopicId', 0, { min: 0 }, 'feed'),
    },
    title: {
      default: text('title', 'Героические рейды на Neltharion x3', 'feed'),
    },
  },
  template: '<feed-card :feed="{ coverUrl, forumTopicId, title }" />',
})
