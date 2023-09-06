import type { App } from 'vue'
import { defineAsyncComponent } from "vue";
export const components = [
    'Filter',
    'Table',
    'Etable',
    'Form',
    'BtnBox',
    'DialogTem',
    'AceEditor'
]
export function setupGlobalCom(app: App<Element>) {
    components.forEach(key => {
        app.component(key, defineAsyncComponent(() => import(`./${key}/index.vue`)))
    })
}
