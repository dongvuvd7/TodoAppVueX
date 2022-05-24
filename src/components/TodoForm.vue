<template>
  <form @submit="onSubmit">
    <input type="text" v-model="title" />
    <input type="submit" value="Add" />
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid"; //package for generating unique ids

export default {
  name: "TodoForm",
  data() {
    return {
      title: "",
    };
  },

  created() {
    // console.log("TodoForm created");
  },

  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(event) {
      event.preventDefault();
      this.addTodo({
        id: uuidv4(), //auto generate id
        title: this.title,
        completed: false,
      });
      this.title = "";
    },
  },
};
</script>

<style>
form {
  padding: 10px;
}

input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin: 6px 0;
  border: 0;
}

input[type="submit"] {
  cursor: pointer;
  margin: 10px auto;
  padding: 10px;
  border: 0;
  display: block;
}
</style>