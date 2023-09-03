import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { isAuthenticated: false, user: {}, userName: {} }
    },
    getters: {
        getAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
        getUserName: (state) => state.userName,
      },
      actions: {
        setAuth(isAuth){
            this.isAuthenticated = isAuth;            
        },
        setUser(user){
            if(user){
                this.user = user;
            }else {
                this.user = {}
            }
        },
        setUserName(userName){
            if(userName){
                this.userName = userName;
            }else {
                this.userName = {}
            }
        },
    }
})