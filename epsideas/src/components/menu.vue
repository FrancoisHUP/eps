<template>
  <div class= "menu">
      <link
      href="https://fonts.googleapis.com/css2?family=Comforter&family=Comforter+Brush&family=IBM+Plex+Sans+Thai+Looped:wght@100;300&family=Mochiy+Pop+P+One&family=Nunito:wght@200&family=Raleway:wght@200&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Comforter&family=Comforter+Brush&family=IBM+Plex+Sans+Thai+Looped:wght@100&family=Mochiy+Pop+P+One&family=Nunito:wght@200&family=Raleway:wght@200&display=swap"
      rel="stylesheet"
    />
<div class="Rubriques" style="height: 60px;">
    <button @click="displayComponentProfil()">Profil</button>

</div>
  <div class="Rubriques"  style="height: 60px;">
    <button @click="displayComponentMesIdees()">Mes idées</button>

</div> 
  <div class="Rubriques"  style="height: 60px;">
    <button @click="displayComponentFavoris()">Mes favoris</button>

  </div>
  
  </div>
  
</template>
<script>
//import * as fb from "../index.js";
//import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: "MeNu",

  data: () => ({
   
  }),

  methods: {
    
 
    displayComponentProfil() {
      this.$router.push("/recupererpassword").catch(() => {});
    },
    displayComponentMesIdees() {
      this.$router.push("/inscription").catch(() => {});
    },
    displayComponentFavoris() {
      this.$router.push("/profil").catch(() => {});
    },
  },
};
</script>
<style scoped>
.menu {
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-size: 24px;
  margin-top: 3px;
  margin-left: 3px;
  padding: 10px;
  height: 100%;
}
.Rubriques:hover {
  color:#0f64e2;
  background-color:azure;
}
</style>