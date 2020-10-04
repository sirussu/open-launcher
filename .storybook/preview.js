import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/vue'
import { VApp, VContent } from 'vuetify/lib'
import vuetifyConfig from '../src/modules/vuetify'
import i18nConfig from '../src/modules/i18n'

const appDecorator = () => {
  return {
   i18n: i18nConfig(),
    vuetify: vuetifyConfig(),
    components: { VApp, VContent },
    template: `
      <v-app>
          <v-content>
            <story/>
          </v-content>
      </v-app>
    `,
  }
}
addDecorator(appDecorator)
addDecorator(withKnobs)
