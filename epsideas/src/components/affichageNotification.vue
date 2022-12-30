<template>
<div>
  <div style="display: flex;font-family: 'IBM Plex Sans Thai Looped', sans-serif;">
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
    <div style="flex:1%">
    <v-avatar
      :color="couleur"
      size="40"
      style="margin-left: 10px; margin-right: 10px"
      ><span style="color: black; font-size: 18px">
        {{ avatar }}</span
      ></v-avatar
    >
    </div>
    <div style="flex:80%">
      <p style="font-weight: bold; margin-top: 8px; font-size: 16px">
        {{ nom }} {{notification}} "{{titreTache}}"
      </p>
    </div>
    <div style="margin-right:15px; margin-top:8px;">
        <button>
        <v-icon color="red" size="25">mdi-close</v-icon>
        </button>
    </div>
  </div>
  <hr style="margin-top: 10px; margin-bottom: 10px;margin-left:10px; margin-right:10px;" />
</div>
</template>

<script>
import * as fb from "../scripts/firebase";
import { getUserInfoByUid } from "../scripts/authentification"

export default {
  name: "affichageNotification",
  data: () => {
    return {
        nom:String,
        avatar:String,
        couleur:String,
        titreTache:"Sport"
    };
  },
  props: {
    idTache: String,
    notification: String,
    date: String,
  },
  methods: {
      UserMoi() {
      const uid = fb.auth.currentUser.uid;
      if (uid != null)
        getUserInfoByUid(uid).then((userInfo) => {
          this.couleur = userInfo.data().color;
          this.avatar = userInfo.data().initial;
          this.nom = userInfo
            .data()
            .name.concat(" ")
            .concat(userInfo.data().lastName);
        });
    },
  },
  beforeMount(){
      this.UserMoi();
  }
};
</script>

<style scoped></style>
