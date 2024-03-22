import { createRouter, createWebHistory } from 'vue-router'
import HomeCom from '../views/HomeCom.vue'
import ClassCom from '../views/ClassCom.vue'
import ResultCom from '../views/ResultCom.vue'
import ThemSinhVien from '../views/ThemSinhVien.vue'





const routes = [
  {
    path: '/',
    name: "home",
    component: HomeCom
  },
  {
    path: '/class/:id',
    name: 'class',
    component: ClassCom
  },
  {
    path: '/result',
    name: 'result',
    component: ResultCom
  },
  {
    path: '/qlsv',
    name: 'qlsv',
    component: ThemSinhVien
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
