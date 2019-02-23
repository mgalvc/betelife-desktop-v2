import Home from './components/home/Home'
import Students from './components/students/Students'
import StudentForm from './components/students/StudentForm'
import Volunteers from './components/volunteers/Volunteers'
import VolunteerForm from './components/volunteers/VolunteerForm'

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/students',
        name: 'students',
        component: Students
    },
    {
        path: '/new-student',
        name: 'new-student',
        component: StudentForm
    },
    {
        path: '/edit-student',
        name: 'edit-student',
        component: StudentForm
    },
    {
        path: '/volunteers',
        name: 'volunteers',
        component: Volunteers
    },
    {
        path: '/new-volunteer',
        name: 'new-volunteer',
        component: VolunteerForm
    },
    {
        path: '/edit-volunteer',
        name: 'edit-volunteer',
        component: VolunteerForm
    },
];