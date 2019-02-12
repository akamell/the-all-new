<template>
    <div class="container__create">
        <form>
            <div class="form-group">
                <label>Description:</label>
                <textarea class="form-control" rows="3" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label>Author:</label>
                <select class="form-control" v-model="userId">
                    <option v-for="user in users" :key="user._id" :value="user._id">
                        {{user.email}} - {{user.fullname}}
                    </option>
                </select>
            </div>
            <button type="button" class="btn btn-primary" @click="save"> Crear </button>
        </form>
    </div>
</template>

<script>

import router from '../router';
export default {
  name: 'task-form',
  data() {
    return {      
      description: '',
      userId: '',
      users: []
    }
  },
  created() {
    fetch('http://localhost:3000/api/users')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { items = [] } = data;
        const users = items.map((item) => {
          const { _id, nombre = '', apellido = '', email = '' } = item;
          return {
            _id,
            email,
            fullname: `${nombre} ${apellido}`,
          }
        });
        this.users = users;
      });
  },
  methods: {
    save() {
      const task = {
        description: this.description,
        author: this.userId,
        active: 1
      };
      fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // router.go("/");
        // redirect to list view
        router.push("/list");
      });
    }
  }
}
</script>
