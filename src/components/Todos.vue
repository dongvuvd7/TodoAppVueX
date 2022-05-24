<template>
  <div class="todo-list">
    <todo-form/>
    <ul v-if="isAuthenticated">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="todo.completed ? 'completed' : ''"
      >
        {{ todo.title }}
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="MARK_COMPLETE(todo.id)"
        />
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <p v-else style="text-align: center">
      Bạn cần đăng nhập để có thể xem danh sách việc cần làm!
    </p>
  </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters } from "vuex";
import TodoForm from './TodoForm.vue';

export default {
  name: "Todos",
  components: {
    TodoForm,
  },

  created() {
    this.getTodos();
  },

  // computed: mapState({
  //   /**
  //    * Lấy danh sách todos từ store để bind lên giao diện
  //    */
  //   todos: state => state.todos,
  //   /**
  //    * Lấy trang thái đang nhập
  //    * Chỉ render list todos khi đã đăng nhập
  //    */
  //   isAuthenticated: state => state.auth.isAuthenticated
  // }),

  /**
   * Một cách viết khác để lấy state của store đó là gọi ra một mảng các state được mapState
   * Nhưng cách này có nhược điểm là
   * - chỉ lấy được các object ngay dưới 1 cấp của state
   * -> Do đó để lấy được isAuthenticated thì binding bên html cần viết auth.isAuthenticated
   * - Không thể thực hiện những xử lý nghiệp vụ tại đây
   * -> Do đó nếu cần xử lý nghiệp vụ trước khi binding lên html thì nên viết computed theo cách thông thường (bên StatusBar, ProgressBar)

   */
  computed: {
    ...mapGetters(["todos", "isAuthenticated"]),
  },

  methods: {
    ...mapMutations(["MARK_COMPLETE"]),
    // deleteTodo(id) {
    //   this.$store.dispatch("deleteTodo", id);
    // }
    ...mapActions(["deleteTodo", "getTodos"])
  },
};
</script>

<style>
.todo-list ul {
  padding: 0 10px 10px 10px;
  list-style-type: none;
}
.todo-list li {
  padding: 10px;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 4px;
  background: rgb(240, 240, 240);
  color: #000;
}
.todo-list li input[type="checkbox"] {
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
  float: right;
}

.todo-list li button {
  float: right;
  margin-right: 20px;
}

.todo-list li button:hover {
  cursor: pointer;
  background: red;
  color: white;
}

.todo-list li.completed {
  background: rgb(119, 218, 243);
}
</style>