<template>
  <div id="app">
    <nav>
      <b-container fluid>
        <Crud-Prueba/>
      </b-container>
    </nav>
  </div>
</template>
<script>
import CrudPrueba from'@/components/Crud'
export default {
  components:{
      CrudPrueba,
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
