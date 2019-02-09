<template>  
    <div class="container">      
      <div class="row">
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3 style="text-align: center;"> Tasks </h3>
        </div>        
        <div class="row">
          <div class="col-md-12">
            <div v-if="loading">
              <p>Loading</p>
            </div>
            <div v-else>
              <task
                v-for="item in items"
                :key="item._id"              
                :description="item.description"
                :authorName="item.authorName"
                :authorEmail="item.authorEmail"
                :authorActivo="item.authorActivo"
                :createdAt="item.createdAt"
              >
              </task>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 5px;">
        <div class="col-md-4"> <button class="btn btn-secondary" @click="back"> back </button></div>
        <div class="col-md-4"> <input type="text" size="3" :value="page" readonly style="text-align: center;"/> </div>
        <div class="col-md-4"> <button class="btn btn-secondary" @click="next"> next </button></div>
      </div>
    </div>
</template>

<script>
import Task from '../components/Task';

export default {
  name: 'app',
  components: {
    'task': Task,
  },
  data() {
    return {
      loading: true,
      items: [],
      limit: 0,
      page: 0,
      pages: 0,
      skip: 0,
      total: 0,      
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    create(post) {
      fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.items.push(data);
        });
    },
    back(){
      let pageNow = 1;
      if (this.page > 1){
        pageNow = this.page - 1;
        this.page = pageNow;
      }
      this.getTasks();
    },
    next() {
      let pageNow = this.page;
      // si la pagina actual es menor a las paginas totales
      if (pageNow < this.pages) {
        pageNow = this.page + 1;
        this.page = pageNow;
      }
      this.getTasks();
    },
    getTasks() {
      let url = 'http://localhost:3000/api/tasks?limit=1&page='+this.page;
      if (this.page == 0) {
        url = 'http://localhost:3000/api/tasks';
      }
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { items = [] } = data;
          const { meta = {} } = data;

          // setting var page from api
          this.page = meta.page;
          this.pages = meta.pages;
          
          const tasks = items.map((item) => {
            const { author = {}, createdAt = '', updatedAt = '' } = item;
            const { nombre = 'Anonimo', apellido = '', activo = 0, email = '' } = author;

            return {
              description: item.description,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              authorName: `${nombre} ${apellido}`,
              authorEmail: email,
              authorActivo: activo,
            };
          });

          this.items = tasks;
          this.loading = false;
        });
    }
  },
};
</script>
