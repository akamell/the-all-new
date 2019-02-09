<template>
  <form>
    <div class="form-group">
      <label>Photo URL:</label>
      <input
        type="text"
        class="form-control"
        v-model="photo_url"
      >
    </div>
    <div class="form-group">
      <label>Location:</label>
      <input
        type="text"
        class="form-control"
        v-model="location"
      >
    </div>
    <div class="form-group">
      <label>Description:</label>
      <textarea
        class="form-control"
        rows="3"
        v-model="description"
      ></textarea>
    </div>
    <div class="form-group">
      <label>Author:</label>
      <select
        class="form-control"
        v-model="userId"
      >
        <option
          v-for="user in users"
          :key="user._id"
          :value="user._id"
        >
          {{user.fullname}}
        </option>
      </select>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="save"
    >Crear</button>
  </form>
</template>

<script>
export default {
  name: 'post-form',
  data() {
    return {
      photo_url: '',
      description: '',
      location: '',
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
          const { _id, firstname = '', lastname = '' } = item;
          return {
            _id,
            fullname: `${firstname} ${lastname}`,
          }
        });

        this.users = users;
      });
  },
  methods: {
    save() {
      this.$emit('save', {
        photo_url: this.photo_url,
        description: this.description,
        location: this.location,
        userId: this.userId,
      });
    }
  }
}
</script>
