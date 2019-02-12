<template>
  <div class="task__container" style="margin: 10px auto 0px auto;">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{authorName}}</h5>
        <p class="card-text">{{description}}</p>
        <p> {{createdAt}}</p>
        <p> Contact: {{authorEmail}} </p>
      </div>
      <div class="card-footer">
        <select class="form-control" @change="changeState" v-model="stateId">
          <option value="3"> choose new state... </option>
          <option value="0"> Inactive </option>
          <option value="1"> Active </option>
        </select>
        <div>
        <br><span v-if="active=='Active'" class="badge badge-info"> {{active}} </span>
        <span v-else class="badge badge-danger"> {{active}} </span>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  data() {
    return {
      stateId: '',
      stateNow: ''
    }
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    active: {
      type: String,
      default: 'Active',
    },
    authorName: {
      type: String,
      required: true,
    },
    authorEmail: {
      type: String,
      default: ''
    },
    authorActivo: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      default: ''
    }
  },
  methods: {
    changeState(){
      if(this.stateId == 3){
        console.log("Debe seleccionar un estado");
      } else {
        const task = {
          active: this.stateId
        };
        fetch('http://localhost:3000/api/tasks/'+this.id, {
          method: 'PUT',
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.active = this.stateId == 0 ? 'Inactive':'Active'
          return response.json();
        })
        .catch((err) => {
          alert("Error");
        })
      }
    }
  }
};
</script>
