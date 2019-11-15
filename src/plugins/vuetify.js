import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import colors from 'vuetify/es5/util/colors'

// console.log(colors.deepOrange.base) // = '#ff0000'
// colors.changeColor('deepOrange', {})

Vue.use(Vuetify)
const opts = {
  icons: {
    iconfont: 'mdi'
  },
  // rtl: false,
  theme: {
    // dark: true,
    themes: {
      dark: {
        // primary: '#6D4C3C',
        // accent: '#513E35',
        // secondary: '#CFBCA4',
        // success: '#92644D',
        // info: '#654C3C',
        // warning: '#6D573C',
        // error: '#6D433C'
      },
      light: {
        // primary: '#1976D2',
        // accent: '#e91e63',
        // secondary: '#30b1dc',
        // success: '#4CAF50',
        // info: '#2196F3',
        // warning: '#FB8C00',
        // error: '#FF5252'
      }
    }
  }
}
// opts.theme.themes.light['deep-orange'] = '#B59E84'
// opts.theme.themes.light['green'] = '#a27754'
// opts.theme.themes.light['purple'] = '#773982'
// opts.theme.themes.light['indigo'] = '#B49D83'
// opts.theme.themes.light['teal'] = '#5E4735'
// opts.theme.themes.light['blue'] = '#523a27'

export default new Vuetify(opts)
