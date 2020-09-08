export default [
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/users/1/edit',
        name: 'EditUsers',
        component: () => import('@/views/users/Edit')
    }
]