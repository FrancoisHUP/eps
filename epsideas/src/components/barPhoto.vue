<template>
  <div class="menu">
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
    <link
      href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap"
      rel="stylesheet"
    />
    <div style="color: white; margin-left: 10px">
      <v-avatar size="100" :color="couleur">
        <span
          style="
            color: black;
            font-size: 40px;
            font-family: 'IBM Plex Sans Thai Looped', sans-serif;
          "
        >
          {{ avatar }}</span
        >
      </v-avatar>
    </div>
    <div style="margin-left: 20px">
      <div style="color: white; padding-top: 10px; font-weight: bold">
        <span style="font-weight: bold"> {{ nom }}</span> <v-icon v-if="suivi && !moi" color="#00FF00">mdi-check-outline</v-icon>
      </div>
      <div style="padding-top: 10px" v-if="moi">
        <v-btn
          class="white--text"
          color="#0F64E2"
          @click="displayComponentEditProfil()"
        >
          <span style="font-weight: bold">Éditer le profil</span>
        </v-btn>
      </div>
      <div style="padding-top: 10px" v-if="!moi">
        <v-btn
          v-if="!suivi"
          class="white--text"
          color="#0F64E2"
          @click="suivre()"
        >
          <span style="font-weight: bold">Suivre</span>
        </v-btn>
        <v-btn
          v-if="suivi"
          class="white--text"
          color="#0F64E2"
          @click="nePlusSuivre()"
        >
          <span style="font-weight: bold">Ne plus Suivre</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { checkAbonnement,removeAbonnement,addAbonnement } from "../scripts/abonnement"

export default {
  name: "barPhoto",

  data: () => ({
    suivi: false,
  }),
  props: {
    couleur: String,
    avatar: String,
    nom: String,
    autreUid:String,
    moi: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    displayComponentEditProfil() {
      this.$emit("profil");
    },
    suivre() {
      addAbonnement(this.autreUid);
      this.suivi = true;
    },
    nePlusSuivre() {
      removeAbonnement(this.autreUid);
      this.suivi = false;
    },
    async setBoutonSuivre() {
      this.suivi = await checkAbonnement(this.autreUid);
    },
  }, 
  beforeMount() {
    this.setBoutonSuivre();
  },
};
</script>
<style scoped>
.menu {
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-size: 24px;
  background-color: #5468ad;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: flex-start;
  font-weight: bold;
}
.pointeur:hover {
  color: #0f64e2;
}
</style>
