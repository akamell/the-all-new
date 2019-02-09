<template>
  <div id="app">
    <div class="container">      
      <div class="row">
        <div class="col-sm">
          <div class="col-md-12" style="margin:3% 0px 3% 0px; border-bottom: 1px dotted #CCC; padding-bottom: 10px;">
            <button class="btn btn-primary" @click="listTask"> Tasks </button>
            <button class="btn btn-primary" @click="createTask" style="margin-left: 5px;"> Create tasks </button>
            <button class="btn btn-primary" @click="updateTask" style="margin-left: 5px;"> Update task </button>
            <button class="btn btn-success" @click="createAuthor" style="margin-left: 5px;"> Create author </button>
          </div> 
        </div>
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
        <div class="col-sm">
          <!--<post-form @save="create">
          </post-form>-->
        </div>
      </div>
      <div v-if="showButton" class="row" style="margin-top: 5px;">
        <div class="col-md-4"> <button class="btn btn-secondary" @click="back"> back </button></div>
        <div class="col-md-4"> <input type="text" size="3" :value="page" readonly style="text-align: center;"/> </div>
        <div class="col-md-4"> <button class="btn btn-secondary" @click="next"> next </button></div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu';
import Task from './components/Task';
import PostForm from './components/PostForm';

export default {
  name: 'app',
  components: {
    // 'menu': Menu,
    'task': Task,
    'post-form': PostForm,
  },
  data() {
    return {
      loading: true,
      showButton: true,
      items: [],
      limit: 0,
      page: 0,
      pages: 0,
      skip: 0,
      total: 0,      
    }
  },
  created() {
    fetch('http://localhost:3000/api/tasks')
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
          }
        });

        this.items = tasks;
        this.loading = false;
      });
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
      fetch('http://localhost:3000/api/tasks?limit=1&page='+this.page)
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
            const {nombre = 'Anonimo', apellido = '', activo = 0, email = '' } = author;

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
    },
    next() {
      let pageNow = this.page;
      // si la pagina actual es menor a las paginas totales
      if (pageNow < this.pages) {
        pageNow = this.page + 1;
        this.page = pageNow;
      }
      fetch('http://localhost:3000/api/tasks?limit=1&page='+this.page)
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
            const {nombre = 'Anonimo', apellido = '', activo = 0, email = '' } = author;

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
    },
    listTask() {
      this.showButton = true;
    },
    createTask() {
      this.showButton = false;
    },
    updateTask() {
      this.showButton = false;
    },
    createAuthor() {
      this.showButton = false;
    }
  },
};
</script>
