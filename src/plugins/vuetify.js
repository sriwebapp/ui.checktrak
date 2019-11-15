import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi'
  },
  rtl: false,
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#6D4C3C',
        accent: '#513E35',
        secondary: '#CFBCA4',
        success: '#92644D',
        info: '#654C3C',
        warning: '#6D573C',
        error: '#6D433C'
      },
      light: {
        primary: '#1976D2',
        accent: '#e91e63',
        secondary: '#30b1dc',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    }
  }
}

export default new Vuetify(opts)
