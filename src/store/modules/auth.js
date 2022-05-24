const authModule = {
state: {
    /**
     * Biến kiểm tra người dùng đã đăng nhập chưa
     */
    auth: {
        isAuthenticated: false,
    },
},

getters: {
    isAuthenticated: state => state.auth.isAuthenticated,
},

actions: {},

mutations: {
    /**
     * Login/Logout
     */
    TOGGLE_AUTH(state) {
        state.auth.isAuthenticated = !state.auth.isAuthenticated;
    },
},
}

export default authModule;
