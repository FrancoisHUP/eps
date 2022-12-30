<template>
  <div class="creer">
    <div>
      <v-icon
        color="blue"
        size="35"
        style="margin-bottom: 10px; margin-right: 10px"
        >mdi-pencil-plus</v-icon
      >
      <span style="font-weight: bold; font-size: 28px">Modifier la tâche</span>
      <br />
      <hr style="margin-bottom: 40px" />
    </div>
    <div style="display: flex">
      <v-icon style="margin-right: 10px">mdi-lock-open</v-icon>
      <v-select
        :items="items"
        label="Visibilité"
        v-model="visibilite"
        placeholder="Sélectionner la visibité de la tache"
      ></v-select>
    </div>
    <v-text-field
      label="Titre de la tâche"
      v-model="titreTache"
      placeholder="Veuillez saisir le titre de l'idée"
      type="text"
      required
    ></v-text-field>
    <v-text-field
      label="Description de la discipline"
      v-model="disciplineTache"
      placeholder="Veuillez saisir la discipline sportive"
      type="text"
      required
    >
    </v-text-field
    ><v-text-field
      label="Niveau d'apprentissage"
      :value="niveauTache"
      placeholder="Veuillez saisir le niveau d'apprentissage"
      type="text"
      required
    ></v-text-field>
    <v-file-input
      style="margin-bottom: 40px"
      label="téléverser un fichier"
      v-model="image"
      @change="imgNullFunc()"
    ></v-file-input>
    <div v-if="imgNull">
      <v-img :src="url" style="max-height: 200px" />
      <pdf :src="url"></pdf>
    </div>
    <v-container fluid>
      <vue-editor
        counter
        :rules="rules"
        v-model="description"
        placeholder="Saisir une description de la tâche.."
        style="background-color:rgba(255, 182, 193, 0.192;margin-bottom: 40px;"
      ></vue-editor>
    </v-container>
    <v-row align="center" style="margin-bottom: 60px">
      <v-btn @click="updateTache()" color="primary" style="margin-left: 45px">
        Confirmer
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.native="retour()" color="error" style="margin-right: 45px">
        Annuler
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import * as fb from "../scripts/firebase";
import { VueEditor } from "vue2-editor";
import { modifierTache } from "../scripts/tache";

//import pdf from 'vue-pdf'
export default {
  components: {
    VueEditor,
  },

  data: () => ({
    visibilite: "",
    rules: [(v) => v.length <= 100000 || "Max 25 characters"],
    description: "",
    niveauTache: "",
    titreTache: "",
    disciplineTache: "",
    imgNull: false,
    image: "",
    items: ["Privée", "Public"],
  }),
  name: "modifierTache",
  methods: {
    async getTache() {
      const document = await fb.getTache(this.id);
      const data = document.data();
      this.titreTache = data.titreTache;
      this.niveauTache = data.niveauTache;
      this.visibilite = data.visibilite;
      this.description = data.description;
      this.disciplineTache = data.disciplineTache;
    },
    updateTache() {
      modifierTache(
        this.id,
        this.titreTache,
        this.description,
        this.niveauTache,
        this.disciplineTache,
        this.visibilite,
        this.document
      )
        .then(() => {
          this.$emit("confirmer");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    retour() {
      this.$emit("annuler");
    },
    imgNullFunc() {
      if (this.image !== "") {
        this.imgNull = true;
      } else {
        this.imgNull = false;
      }
    },
  },
  computed: {
    url() {
      if (!this.image) return;
      return URL.createObjectURL(this.image);
    },
  },
  props: {
    id: String,
  },
  beforeMount() {
    this.getTache();
  },
};
</script>

<style scoped>
.creer {
  font-family: IBM Plex Sans Thai Looped, sans-serif;
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
