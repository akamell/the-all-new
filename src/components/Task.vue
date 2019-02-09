<template>
  <div class="task__container" style="margin: auto;">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{authorName}}</h5>
        <p class="card-text">{{description}}</p>
        <p> {{createdAt}}</p>
        <p> Contact: {{authorEmail}} </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    description: {
      type: String,
      default: '',
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
};
</script>
