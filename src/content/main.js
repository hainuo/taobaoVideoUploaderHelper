import {createApp} from 'vue'
import ElementPlus from 'element-plus';
import app from './components/app.vue'

joinContent(app)
injectJsInsert()
console.log('this is content-script');
const url = chrome.extension.getURL('assets/elementuiplus.1.0.2.b45.css');
console.log(url);

function joinContent(element) {
  const div = document.createElement('div')
  div.id = 'joinContentApp'
  document.body.appendChild(div);
  console.log(div)
  const app = createApp(element)
  app.use(ElementPlus)
  app.mount('#joinContentApp')

  // const url = chrome.extension.getURL('assets/elementuiplus.1.0.2.b45.css');
  // console.log(url);
  const linkTag = document.createElement('link');
  // <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css">
  linkTag.setAttribute('rel', 'stylesheet');
  linkTag.href = 'https://unpkg.com/element-plus/lib/theme-chalk/index.css';
  document.getElementsByTagName('head')[0].appendChild(linkTag);
}

function injectJsInsert() {
  document.addEventListener('readystatechange', () => {
    const injectPath = 'js/inject.js'
    const script = document.createElement('script')

    script.setAttribute('type', 'text/javascript')
    script.src = chrome.extension.getURL(injectPath)
    document.body.appendChild(script)
  })
}
