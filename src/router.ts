import main_page from "./pages/main_page.vue"
import task_page from "./pages/task_page/task_page.vue"
import decision_page from "./pages/decision_page/decision_page.vue"
import leaderBoard_page from "./pages/leader-board_page/leader-board_page.vue"
import authorization_page from "./pages/authorization_page/authorization_page.vue"
import registration_page from "./pages/registration_page/registration_page.vue"


const routes = [
    {
        path: '/',
        name: 'main',
        component: main_page
    },
    {
        path: '/tasks',
        name: 'task',
        component: task_page
    },
    {
        path: '/solution',
        name: 'solution',
        component: decision_page
    },
    {
        path: '/leader_board',
        name: 'leader_board',
        component: leaderBoard_page
    },
    {
        path: '/authorization',
        name: 'autorization',
        component: authorization_page
    },
    {
        path: '/registration',
        name: 'registration',
        component: registration_page
    },
]

export default routes