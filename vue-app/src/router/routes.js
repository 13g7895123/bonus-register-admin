const routes = [
    {
        path: "/",
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            { path: "/player", component: () => import('../views/PlayerUser.vue')},
            { path: "/systemUser", component: () => import('../views/SystemUser.vue')},
        ]
    },
    {
        path: "/register",
        name: 'Register',
        component: () => import('../views/Register.vue'),
    },
    {
        path: "/login",
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue')
    }
]

export default routes