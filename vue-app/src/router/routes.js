const routes = [
    {
        path: "/",
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            { path: "/player", name: 'player', component: () => import('../views/PlayerUser.vue')},
            { path: "/player/edit/:id", name: 'editPlayer', component: () => import('../views/PlayerUserEdit.vue')},
            { path: "/player/add", name: 'addPlayer', component: () => import('../views/PlayerUserAdd.vue')},
            { path: "/server", component: () => import('../views/Server.vue')},
            { path: "/systemUser", component: () => import('../views/SystemUser.vue')},
            { path: "/systemAdmin", component: () => import('../views/SystemAdmin.vue')},
            { path: "/systemAdmin/edit/:id", name: 'editSystemAdmin', component: () => import('../views/SystemAdminEdit.vue')},
        ]
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