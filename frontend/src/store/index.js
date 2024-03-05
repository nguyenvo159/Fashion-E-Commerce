// src/store.js
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            user: null,
            token: null,
        }
    },
    mutations: {  // Cập nhật trạng thái của ứng dụng
        SET_USER(state, user, token) {
            state.user = user;
            state.token = token;
        },
        LOGOUT(state) {
            state.user = null; // Đăng xuất, xóa thông tin người dùng khỏi store
            state.token = null;
        }
    },
    actions: {
        // Thực hiện các hành động (ví dụ: gửi yêu cầu API)
    },
    getters: { // Láy dữ liệu từ store
        isLoggedIn(state) {
            return state.user !== null; // Kiểm tra xem người dùng đã đăng nhập chưa
        },
        isAdmin(state) {
            return state.user !== null && state.user.isAdmin;
        },

        getUser(state) {
            return state.user;
        },
        getToken(state) {
            return state.token;
        },
    }
})

export default store;
