import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import SuiVue from 'semantic-ui-vue'
import VueTheMask from 'vue-the-mask'
import { routes } from './routes'
import { storeData } from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import { howMany, getStudents, getStudent, printStudent, printVolunteer, deleteStudent, saveStudent, updateStudent, updateStudentStatus, getVolunteer, updateVolunteerStatus, deleteVolunteer, getVolunteers, saveVolunteer, updateVolunteer} from './database/database'

import 'semantic-ui-css/semantic.min.css';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(SuiVue);
Vue.use(VueTheMask);

Vue.component('v-icon', Icon);

Vue.prototype.$howMany = howMany;
Vue.prototype.$getStudents = getStudents;
Vue.prototype.$getStudent = getStudent;
Vue.prototype.$printStudent = printStudent;
Vue.prototype.$printVolunteer = printVolunteer;
Vue.prototype.$deleteStudent = deleteStudent;
Vue.prototype.$saveStudent = saveStudent;
Vue.prototype.$updateStudent = updateStudent;
Vue.prototype.$updateStudentStatus = updateStudentStatus;
Vue.prototype.$getVolunteer = getVolunteer;
Vue.prototype.$updateVolunteerStatus = updateVolunteerStatus;
Vue.prototype.$deleteVolunteer = deleteVolunteer;
Vue.prototype.$getVolunteers = getVolunteers;
Vue.prototype.$saveVolunteer = saveVolunteer;
Vue.prototype.$updateVolunteer = updateVolunteer;


const router = new VueRouter({
    routes,
    mode: 'history'
});

const store = new Vuex.Store(storeData);

const app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
