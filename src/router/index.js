import VueRouter from "vue-router";

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/LoginComponent'),
    },
    {
        path: '/SuperAdmin/Home',
        name: 'SuperAdminHome',
        component: () => import('../components/superAdmin/SuperAdminHomeComponent.vue'),
    },
    {
        path: '/SuperAdmin/Manage',
        name: 'SuperAdminManage',
        component: () => import('../components/superAdmin/SuperAdminManageUsersComponent.vue'),
    },
    {
        path: '/SuperAdmin/Authority',
        name: 'SuperAdminAuthority',
        component: () => import('../components/superAdmin/SuperAdminManageAuthorityComponent.vue'),
    },
    {
        path: '/Admin/Home',
        name: 'AdminHome',
        component: () => import('../components/admin/AdminHomeComponent.vue'),
    },
    {
        path: '/User/Home',
        name: 'UserHome',
        component: () => import('../components/user/UserHomeComponent.vue'),
    },
    {
        path: '/User/RabiesOverview',
        name: 'RabiesOverview',
        component: () => import('../components/user/UserRabiesOverviewComponent.vue'),
    },
    {
        path: '/User/SequenceSearch',
        name: 'SequenceSearch',
        component: () => import('../components/user/UserSequenceSearchComponent.vue'),
    },
    {
        path: '/User/SequenceSubmit',
        name: 'SequenceSubmit',
        component: () => import('../components/user/UserSequenceSubmitComponent.vue'),
    },
]

const router = new VueRouter(
    {
        mode:'history',
        routes,
    })

// 这一段代码用于解决点击Personal Info时的报错问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to){
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router;