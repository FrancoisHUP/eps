<template>
  <div class="profi">
    <div>
      <v-icon style="margin-right: 10px; margin-bottom: 7px; color: #b71c1c">
        mdi-home-city</v-icon
      >
      <span style="font-weight: bold; font-size: 28px">Mon profil</span>
      <br />
      <hr style="margin-bottom: 40px" />
    </div>
    <v-avatar size="130" style="flex: 10%" :color="couleur">
      <span style="font-size: 40px">{{avatar}}</span></v-avatar
    ><br /><br />
    <div style="display: flex">
      <span style="flex: 10%; padding-top: 20px">Nom:</span>
      <v-text-field
        style="flex: 70%"
        v-model="nom"
        :disabled="!edit"
      ></v-text-field>
    </div>
    <br /><br />
    <div style="display: flex">
      <span style="flex: 15%; padding-top: 20px">Prénom:</span>
      <v-text-field
        style="flex: 70%"
        v-model="prenom"
        :disabled="!edit"
      ></v-text-field>
    </div>
    <br /><br />
    <div style="display: flex">
      <span style="flex: 10%; padding-top: 20px">Email:</span>
      <v-text-field
        style="flex: 70%"
        v-model="email"
        :disabled="true"
      ></v-text-field>
    </div>
    <br /><br />
    <v-btn
      v-if="!edit"
      class="white--text"
      color="#0F64E2"
      @click="edit = true"
    >
      <span style="font-weight: bold">Éditer le profil</span>
    </v-btn>
    <v-btn
      v-if="edit"
      class="white--text"
      color="#0F64E2"
      @click=" modifierProfil()"
    >
      <span style="font-weight: bold">Valider</span>
    </v-btn>
  </div>
</template>

<script>
//import { useDeviceLanguage } from '@firebase/auth';
import * as fb from "../scripts/firebase";
import { modifierProfil } from "../scripts/profil"
import { getUserInfoByUid } from "../scripts/authentification"

export default {
  name: "afficheProfil",
  edit: true,
  data: () => {
    return {
      edit: false,
      nom: "",
      prenom: "",
      email: "",
      couleur:"",
      avatar:"",
    };
  },
  methods: {
    async modifierProfil(){
      this.edit = false;
      modifierProfil(this.nom,this.prenom,this.nom.charAt(0).concat(this.prenom.charAt(0)).toUpperCase(),fb.auth.currentUser.uid);
      this.getUserInfo();
    },
    getUserInfo() {
      getUserInfoByUid(fb.auth.currentUser.uid).then((user) => {
        this.nom = user.data().name;
        this.prenom = user.data().lastName;
        this.email = user.data().email;
        this.avatar = user.data().initial;
        this.couleur = user.data().color;
      });
    },
  },
  beforeMount() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.profi {
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-size: 24px;
  margin-top: 3px;
  margin-left: 3px;
  padding: 30px;
  height: 100%;
  align-content: center;
  text-align: center;
  border-style: ridge;
  margin-bottom: 40px;
}
</style>
