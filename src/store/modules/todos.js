import axios from "axios";

const todosModule = {
    state: {
        /**
         * Danh sách các việc cần làm
         */
        todos: [
            // {
            //     id: 1,
            //     title: "Learn Vue.js",
            //     completed: true,
            // },
            // {
            //     id: 2,
            //     title: "Learn Vuex",
            //     completed: true,
            // },
            // {
            //     id: 3,
            //     title: "Learn Vue Router",
            //     completed: false,
            // },
        ],
    },

    getters: {
        // Lấy danh sách các việc cần làm
        todos: state => state.todos,
        //Lấy ra danh sách các việc đã hoàn thành
        doneTodos: (state) => {
            return state.todos.filter((todo) => todo.completed);
        },
        //Tính tiến độ công việc (%)
        progress: (state, getters) => {
            const totalCompleted = getters.doneTodos.length;
            return Math.round((totalCompleted / state.todos.length) * 100);
        },
    },

    actions: {
        async deleteTodo({ commit }, todoId) {
            // commit('DELETE_TODO', todoId);
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
                commit("DELETE_TODO", todoId);
            } catch (error) {
                console.log(error);
            }
        },
        async addTodo({ commit }, newTodo) {
            // commit('ADD_TODO', newTodo);
            try {
                await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
                commit("ADD_TODO", newTodo);
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Call api lay danh sach todo
         */
        async getTodos({ commit }) {
            try {
                const reponse = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5");
                commit("SET_TODOS", reponse.data);
            } catch (error) {
                console.log(error);
            }
        },
    },

    mutations: {
        /**
         * Login/Logout
         */
        TOGGLE_AUTH(state) {
            state.auth.isAuthenticated = !state.auth.isAuthenticated;
        },
        /**
         * Đánh dáu việc đã hoàn thành
         */
        MARK_COMPLETE(state, todoId) {
            state.todos.map((todo) => {
                if (todo.id === todoId) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
        },
        /**
         * Xóa một việc
         */
        DELETE_TODO(state, todoId) {
            state.todos = state.todos.filter((todo) => todo.id !== todoId);
        },
        /**
         * Thêm một việc
         */
        ADD_TODO(state, todo) {
            //dùng unshift để thêm vào đầu danh sách (push sẽ thêm vào cuối danh sách)
            state.todos.unshift(todo);
        },
        /**
         * Đưa các việc cần làm vào danh sách todos trong state
         */
        SET_TODOS(state, todos) {
            state.todos = todos;
        },
    },
};

export default todosModule;
