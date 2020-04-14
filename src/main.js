
import Vue from 'vue'
import app from './app.vue';

import component from './components';
component(Vue);

import Prism from 'prismjs';
import "prismjs/themes/prism.css";

Prism.highlightAll();

window.bus = new Vue(); // Глобальная событийная шина
window.ON_SELECT_FILE = 'ON_SELECT_FILE';


new Vue({
    render: h => h(app),
}).$mount('#app');



