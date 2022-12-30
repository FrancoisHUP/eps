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
          Inscription
        </p>
      </div>

      <div class="attribut">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
            v-model="nom"
            label="Nom"
            placeholder="Veuillez saisir votre nom"
            required
          ></v-text-field>
          <v-text-field
            v-model="prenom"
            label="Prénom"
            placeholder="Veuillez saisir votre prénom"
            required
          ></v-text-field>
          <v-text-field
            v-model="emailIns"
            :rules="emailRules"
            label="Adresse électronique"
            placeholder="Veuillez saisir votre e-mail"
            required
          ></v-text-field>
        <v-text-field
            v-model="NewPasswordIns"
            type="password"
            autocomplete="on"
            label="Mot de passe"
            placeholder="Veuillez saisir votre mot de passe"
            required
          ></v-text-field>

          <v-text-field
            v-model="ConfNewPasswordIns"
            type="password"
            autocomplete="on"
            label="Confirmer le mot de passe"
            placeholder="Veuillez saisir de nouveau votre mot de passe"
            required
          ></v-text-field>
           
          <div class="text-center">
  
        
        <v-btn 
          class="white--text" :disabled="!soumettre" color="#0F64E2" style="margin-top  : 25px;" @click="register()">
            Soumettre
          </v-btn>
           <br /><br />
          <div
            v-if="error1"
            style="
              background-color: rgba(205, 92, 92, 0.226);
              border-radius: 10px;
              text-align: center;
            "
          >
            <span
              style="
                font-family: 'IBM Plex Sans Thai Looped', sans-serif;
                font-size: 24px;
              "
              >{{ message }}</span
            >
          </div>

          </div>   
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import { register } from "../scripts/authentification";
export default {
  

    name:"CreateAccount",
  data: () => ({
error1:false,
    dialog: false,
    soumettre: true,
    valid:false,
    message:"",
    nom:"",
    prenom:"",
    name: "",
    ConfNewPasswordIns:"",
    NewPasswordIns:"",
    emailIns:"",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    checkbox: false,
  }),

  methods: {
    register(){
        if( this.nom === "" || this.prenom === "" || this.emailIns === ""){
          this.error1 = true;
          this.message = "Aucun champ ne doit être vide"
          return;
        } else if(this.NewPasswordIns !== this.ConfNewPasswordIns){
          this.error1 = true;
          this.message = "Les deux champs mot de passe ne concordent pas"
          return;
           // verifier la longueur du password
        } else if (this.NewPasswordIns.length <= 6){
          this.error1 = true;
          this.message = "Mot de passe trop court. Le mode de passe doit avoir plus de 6 carateres.";
        } else {
          this.error1=false;
          register(this.emailIns,this.NewPasswordIns,this.prenom,this.nom).then(()=> {
            this.displayComponentProfil();
          }).catch( (error) => {
              //const errorCode = error.code;
              //const errorMessage = error.message;
              console.log(error.message)
              this.error1=true;
              this.message = "Adresse courriel est deja inscrite.";
          }); 
        }
        
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
    displayComponentProfil() {
      console.log("button pressed");
      this.$router.push({path : `/profil/${this.nom} ${this.prenom}`}).catch(() => {});
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
