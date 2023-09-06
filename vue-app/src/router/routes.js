const routes = [
    {
        path: "/",
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            { path: "/member", component: () => import('../views/Member.vue')},
            { path: "/medicine", component: () => import('../views/Medicine.vue')},
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
        path: "/player",
        name: 'playerUser',
        component: () => import('../views/PlayerUser.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue')
    }
]

export default routes