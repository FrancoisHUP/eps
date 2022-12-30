<template>
  <div class="login">
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
    <div class="logo-cont">
      <div>
        <v-img src="../images/epsideas.png" max-width="100%"></v-img>
      </div>
      <div>
        <p class="slogan">Partagez vos idées en toute simplicité</p>
      </div>
    </div>
    <div class="info-cont">
     <v-img
        id="logo"
        src="../images/epsideas.png"
        max-height="60"
        max-width="150"
        style="margin-bottom: 40px"
      ></v-img>
      <div style="height: 100px;"> 
        <p
          style="
            font-family: 'IBM Plex Sans Thai Looped', sans-serif;
            font-size: 36px;
          "
        >
          Recupérer votre mot de passe
        </p>
      </div>

      <div class="attribut">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="emailConf"
            :rules="emailRules"
            label="Adresse électronique, un courriel vous sera envoyé."
            placeholder="Veuillez saisir votre e-mail"
            required
          ></v-text-field>
           
     
        <v-btn class="white--text" :disabled="!confirmer" color="#0F64E2" style="margin-top  : 25px;" @click="resetPassword()">
            Confirmer
          </v-btn>          
          
        </v-form>
        <br><br>
        <div v-if="message" style="background-color : azure; border-radius:10px; text-align: center;">
        <span style="
            font-family: 'IBM Plex Sans Thai Looped', sans-serif;
            font-size: 24px;
          ">{{error2}}</span>
        </div>
        <br>
        <div style="text-align: center;" @click="displayComponentLogin()">
        <v-btn style="
            font-family: 'IBM Plex Sans Thai Looped', sans-serif;
            font-size: 18px;
          ">Retour à la page de connexion</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { resetPassword } from "../scripts/authentification";

export default {
    name: "RecupererPassword",
  data: () => ({
    confirmer: true,
    dialog: false,
    error2:"",
    valid:"",
    name: "",
    message: false,
    checkbox: false,
    emailConf:"",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    
  }),

  methods: {
    resetPassword() {
      if(this.emailConf  === ""){
        this.error2 = "Le champ est vide";
        this.message =true;
        return;
      } else {
        this.error2 = "Un courriel de récupération de mot de passe vous sera envoyé"; 
        this.message=true;
      }
      resetPassword(this.emailConf);
    },
    displayComponentLogin() {
      this.message  = true;
     setTimeout(
        this.$router.push("/").catch(() => {})
    , 10000);
      
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style scoped>
.logo-cont {
  flex: 50%;
  align-content: center;
  padding-top: 150px;
}
.slogan {
  font-family: "Comforter Brush", cursive;
  max-width: 100%;
  font-size: 72px;
  max-height: 10%;
}

.info-cont {
  padding-top: 50px;
  flex: 50%;
  border-color: #c4c4c4;
  border-left-style: solid;
  padding-left: 40px;
  padding-right: 80px;
}

.login {
  display: flex;
  top: 0;
left: 0;
bottom: 0;
right: 0;
position: fixed;
  
}

.attribut {
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-size: 24px;
  height: 40%;
}
.inscrire{
    font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-size: 20px;
    height: 15%;
}
bre:hover{
color: #0F64E2;
}
@media only screen and (min-width: 930px) {
  #logo {
    display: none;
  }
}
@media only screen and (max-width: 930px) {
  .logo-cont {
    display: none;
  }
  #logo {
    visibility: visible;
  }
}
</style>
