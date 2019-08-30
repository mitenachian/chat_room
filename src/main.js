// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment, faGrin, faPaperclip, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import firebase from 'firebase'

// Required for side-effects
require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyB5fa40RzoFc0Tet7B0EraEXM2IqmZtFCc",
  authDomain: "chatroom-2870e.firebaseapp.com",
  databaseURL: "https://chatroom-2870e.firebaseio.com",
  projectId: "chatroom-2870e",
  storageBucket: "chatroom-2870e.appspot.com",
  messagingSenderId: "817091346846",
  appId: "1:817091346846:web:1f783f6b827002a2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
window.db = db;

library.add(faComment,faGrin ,faPaperclip, faFile);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
