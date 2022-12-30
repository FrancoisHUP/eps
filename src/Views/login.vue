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
        <v-img src="../images/epsideas.png" max-width="85%"></v-img>
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
      >
      </v-img>
      <div style="height: 100px">
        <p
          style="
            font-family: 'IBM Plex Sans Thai Looped', sans-serif;
            font-size: 36px;
          "
        >
          Bienvenue
        </p>
      </div>

      <div class="attribut">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Adresse électronique"
            placeholder="Veuillez saisir votre e-mail"
            required
          ></v-text-field>
          <div style="text-align: right">
            <v-text-field
              autocomplete="on"
              v-model="password"
              label="Mot de passe"
              placeholder="Veuillez saisir votre mot de passe"
              type="password"
              @keyup.enter="login()"
              required
            ></v-text-field>
            <div style="font-size: 15px">
              <button @click="displayComponentRecuperer()">
                <span style="text-decoration: underline"
                  >Mot de passe oublié?</span
                ></button
              ><br />
            </div>
          </div>

          <v-btn
            id="connexion"
            class="white--text"
            :disabled="!valid"
            color="#0F64E2"
            style="margin-top: 25px"
            @click="
              () => {
                login();
              }
            "
          >
            Connexion
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

          <v-checkbox
            v-model="checkbox"
            label="Rester connecté(e)?"
            required
          ></v-checkbox>
        </v-form>
        <div class="inscrire">
          <p style="text-align: center">
            Vous n’avez pas de compte ?
            <button
              style="text-decoration: underline"
              @click="displayComponentInscription()"
            >
              S’inscrire
            </button>
            <br />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as fb from "../scripts/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginVue",

  data: () => ({
    value: String,
    username1: "Franck",
    name: "",
    error1: false,
    valid: false,
    email: "",
    password: "",
    message: "",
    NewPassword: "",
    ConfNewPassword: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    checkbox: false,
  }),

  methods: {
    login() {
      if (this.email === "" || this.password === "") {
        this.error1 = true;
        this.message = "Aucun champ ne doit pas être vide";
      }
      signInWithEmailAndPassword(fb.auth, this.email, this.password)
        .then(() => {
          // Signed in
          this.displayComponentProfil();
          console.log("reussi");
        })
        .catch((error) => {
          console.log("user not auth");
          this.error1 = true;
          if (this.email !== "" || this.password !== "") {
            this.message = "Votre identifiant ou votre mot est incorrect";
          }
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    displayComponentRecuperer() {
      this.$router.push("/recupererpassword").catch(() => {});
    },
    displayComponentInscription() {
      this.$router.push("/inscription").catch(() => {});
    },
    displayComponentProfil() {
      this.username = this.email;
      this.$router
        .push({ path: `/profil/${"connected"}` })
        .catch(() => {});
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
.inscrire {
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-size: 20px;
  height: 20px;
  margin-top: 70px;
}
bre:hover {
  color: #0f64e2;
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
