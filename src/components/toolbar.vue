<template>
  <v-toolbar id="tool" height="90" dense fixed>
    <button @click="actuality()">
      <div>
        <v-img src="../images/epsideas.png" max-height="60" max-width="150">
        </v-img>
      </div>
    </button>
    <v-spacer></v-spacer>

    <v-text-field
      id="searchBar"
      style="margin-top: 24px; width: 30%"
      placeholder="Rechercher une idée.."
      v-model="result"
      @keyup.enter="search()"
      type="text"
      solo
    >
    </v-text-field>

    <v-spacer></v-spacer>
    <button @click="mesIdees()">
      <v-avatar :color="couleur" style="margin-right: 20px">
        <span
          style="
            color: black;
            font-family: 'IBM Plex Sans Thai Looped', sans-serif;
          "
        >
          {{ avatar }}</span
        >
      </v-avatar>
      <span
        id="name"
        class="font-weight-regular"
        style="
          margin-right: 20px;
          font-family: IBM Plex Sans Thai Looped, sans-serif;
          font-size: 18px;
        "
        >{{ nom }}</span
      >
    </button>
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="voirNotification()"
          icon
          style="margin-right: 20px; width: 20px"
        >
          <v-icon :color="couleurNotification">mdi-message-badge</v-icon>
        </v-btn>
      </template>
      <span>{{ message }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <button v-bind="attrs" v-on="on">
          <v-btn icon style="width: 20px; margin-right: 20px">
            <v-icon>mdi-help-circle-outline </v-icon>
          </v-btn>
        </button>
      </template>
      <span>Aide</span>
    </v-tooltip>

    <div id="deconMax" style="margin-right: 20px; width: 80px">
      <button
        style="
          text-decoration: underline;
          font-family: IBM Plex Sans Thai Looped, sans-serif;
        "
        @click="logout()"
      >
        Déconnexion
      </button>
    </div>
    <div id="deconMini" style="margin-right: 20px; width: 20px">
      <button @click="logout()"><v-icon>mdi-logout-variant</v-icon></button>
    </div>
  </v-toolbar>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "ToolBar",
  data: () => {
    return {
      result: "",
    };
  },
  props: {
    nom: String,
    avatar: String,
    couleur: String,
    couleurNotification: String,
  },
  methods: {
    actuality() {
      this.$router.go();
    },
    mesIdees() {
      this.$emit("mesIdees");
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$router.push("/").catch(() => {});
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    displayComponentDeconnexion() {
      this.$router.push("/").catch(() => {});
    },
    search() {
      this.$emit("result", this.result);
      this.$emit("estResultat");
    },
    voirNotification() {
      this.$emit("voirNotification");
    },
  },
  computed: {
    message() {
      if (this.couleurNotification === "red")
        return "Nouvelles notifications disponibles";
      else return "Aucune notification disponible";
    },
  },
};
</script>

<style scoped>
#tool {
  width: 100%;
  mask: linear-gradient(black 7rem, transparent);
  -webkit-mask: linear-gradient(black 7rem, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
}
@media only screen and (max-width: 930px) {
  #name {
    display: none;
  }
  #searchBar {
    width: 60px;
  }
  #deconMini {
    visibility: visible;
  }
  #deconMax {
    display: none;
  }
}
@media only screen and (min-width: 930px) {
  #name {
    visibility: visible;
  }
  #deconMini {
    display: none;
  }
  #deconMax {
    visibility: visible;
  }
}
</style>
