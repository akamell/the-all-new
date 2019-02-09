<template>
  <div id="app">
    <div class="container">      
      <div id="nav">
        <router-link to="/"> List tasks </router-link>
        <router-link to="/aboult"> Create tasks </router-link>
        <router-link to="/aboult"> Update task </router-link>
        <router-link to="/aboult"> Create author </router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style>
#nav {
  padding: 20px 20px 20px 0;
}

#nav a {
  padding: 10px;
  text-decoration: none;
  background: #fff;
  border-radius: 3px;
  color: rgb(0, 110, 255);
  font-weight: bold;
  margin-right: 15px;
}
</style>