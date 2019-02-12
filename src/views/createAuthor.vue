<template>
    <div class="container__createauthor">
        <form>
            <div class="form-group">
                <label>First name:</label>
                <input class="form-control" v-model="firstname"/>
            </div>
            <div class="form-group">
                <label>Lastname:</label>
                <input class="form-control" v-model="lastname"/>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input class="form-control" v-model="email"/>
            </div>
            <button type="button" class="btn btn-primary" @click="save"> Crear </button>
        </form>

        <b-modal ref="confirmationModal" hide-footer title="Confirmation!">
          <div class="d-block text-center">
            <h3> SUCCESS </h3>
            Nombre: {{firstname}} <br>
            Apellido: {{lastname}} <br>
            Email: {{email}}
          </div>
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'user-form',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: ''
    }
  },
  methods: {
    hideModal() {
      this.$refs.confirmationModal.hide()
    },
    save(){
      const user = {
        nombre: this.firstname,
        apellido: this.lastname,
        email: this.email,
        activo: 1,
      };
      fetch('http://localhost:3000/api/users/user', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
          "Content-Type": "application/json",
          },
      })
      .then((response) => {
          this.$refs.confirmationModal.show()
          return response.json();
      })
      .catch((err) => {
          alert("Error");
      })
      
    }
  }
};
</script>
