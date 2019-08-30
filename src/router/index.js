import Vue from 'vue'
import Router from 'vue-router'
import ChatRoom from '@/components/ChatRoom'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ChatRoom',
      name: 'ChatRoom',
      component: ChatRoom,
      props: true,
      beforeEnter: (to, from , next) => {
        if (to.params.name) {
          next()
        } else { 
          next({ name: 'home' })
        }
      }
    }
  ]
})
