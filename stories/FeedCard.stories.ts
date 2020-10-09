import { text, number } from '@storybook/addon-knobs'

import FeedCard from '@/views/feeds/FeedCard'

export default {
  title: 'FeedCard',
}

export const exampleWithKnobs = () => ({
  components: { FeedCard },
  props: {
    coverUrl: {
      default: text('coverUrl', '/uploads/news/nl3.jpg', 'props'),
    },
    forumTopicId: {
      default: number('forumTopicId', 0),
    },
    title: {
      default: text('title', 'Героические рейды на Neltharion x3', 'props'),
    },
  },
  template: '<feed-card :feed="{ coverUrl, forumTopicId, title }" />',
})
