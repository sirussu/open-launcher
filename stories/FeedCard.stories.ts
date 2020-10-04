import { storiesOf } from '@storybook/vue'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import FeedCard from '@/views/feeds/FeedCard'

storiesOf('FeedCard', module)
  .addDecorator(withKnobs)
  .add('Full controlled FeedCard', () => ({
    components: { FeedCard },
    props: {
      coverUrl: {
        default: text('coverUrl', '', 'props'),
      },
      forumTopicId: {
        default: number('forumTopicId', 0),
      },
    },
    template: '<feed-card :feed="{ coverUrl, forumTopicId }" />',
  }))
