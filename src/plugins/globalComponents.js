// src/plugins/global-components.js
import * as components from '../components/UI'

export default {
  install(app) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}