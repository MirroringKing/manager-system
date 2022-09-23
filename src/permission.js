import router from './router'
import store from './store'
import {
    removeTokenAndUserInfo
} from './utils/auth'

router.beforeEach(async (to, from, next) => {
    const token = store.getters.token
    if (token) {
        if (to.path === "/login") {
            next(from.path)
        } else {
            let userInfo = store.getters.userInfo
            userInfo = typeof userInfo == "object" ? JSON.stringify(userInfo) : userInfo
            if (userInfo == "{}" || userInfo === "") {
                const response = await store.dispatch('handleUserInfo')
                if (response) {
                    next()
                } else {
                    next('/login')
                }
            } else {
                next()
            }
        }
    } else {
        if (to.path === "/login") {
            next()
        } else {
            next("/login")
        }
    }
})