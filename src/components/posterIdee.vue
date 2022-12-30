<template>
  <div class="creer">
    <div >
      <v-icon size="35" style="margin-right:10px;margin-bottom:10px;color:#DEB887">  mdi-cookie</v-icon>
      
      <span style="font-weight: bold; font-size: 28px">Créer une tâche</span>
      <br />
      <hr style="margin-bottom: 40px;"/>
    </div>
    <div style="display:flex;">
   <v-icon style="margin-right: 10px;">mdi-lock-open</v-icon>
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
    label="Discipline"
      v-model="DisciplineTache"
      placeholder="Veuillez saisir la discipline sportive"
              type="text"
              required>
              </v-text-field
    ><v-text-field
      label="Niveau d'apprentissage"
      v-model="niveauTache"
      placeholder="Veuillez saisir le niveau d'apprentissage"
              type="text"
              required
    ></v-text-field>
    <v-file-input
    style="margin-bottom: 40px;"
    label="téléverser un fichier"
    v-model="document"
    @change="imgNullFunc()"
  ></v-file-input>
  <div v-if ="imgNull">
  <v-img :src="url" style = "max-height : 200px" />
  <pdf :src="url"></pdf>
  </div>
    <v-container fluid>
    <vue-editor
      counter
      :rules="rules"
      v-model="description"
      placeholder="Saisir une description de la tâche.."
      style="background-color:rgba(255, 182, 193, 0.192;margin-bottom: 40px;max-width:700px"
    ></vue-editor>
    <v-row align="center" style="margin-bottom: 60px">
      <v-btn :disabled="empty"
        @click="publish()"
        color="primary"
        style="margin-left: 45px"
      >
        Publier
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click.native="annuler()"
        color="error"
        style="margin-right: 45px"
      >
        Annuler
      </v-btn>
    </v-row>
  </v-container>
  </div>
</template>

<script>
//import pdf from 'vue-pdf'
import { VueEditor } from "vue2-editor";
import { publish } from "../scripts/tache";

export default {
 components: {
    VueEditor
  },

    titreTache: "",
    data: () => ({
      visibilite: "",
      rules: [v => v.length <= 100000 || 'Max 25 characters'],
      description: "",
      niveauTache:"",
      DisciplineTache: "",
      imgNull: false,
      titreTache: "",
      document:"",
      items: ['Privée', 'Public'],
    }),
  name: "posterIdee",
methods:{

  async publish(){
    try {
      await publish(this.titreTache,this.description,this.niveauTache,this.DisciplineTache,this.visibilite,this.document);
      this.seenView();
      // update/refresh
      this.$emit('publieIdee');

    } catch (error) {
      console.log(error);
      // TODO gerer les cas derreur ici
    }
  },
  annuler() {
    this.$emit('annulerIdee');
  },
  async seenView() {
    this.estModif = false;
    this.seen = !this.seen;
    this.estprofil = false;
    this.estActualite = true;
    this.estResultat = false;
    this.estMesIdees =false;
    this.estFavoris = false;
  },
imgNullFunc() {
      if(this.image !==""){
        this.imgNull = true;
      }else {
        this.imgNull = false;
      }
    }
},
  computed: {
      empty(){
   if(this.titreTache.length == 0 || this.visibilite.length == 0 ||this.description.length == 0 || this.niveauTache.length == 0 || this.DisciplineTache.length ==0)
   return true;
   else return false;
 },
    url() {
      if (!this.image) return;
      return URL.createObjectURL(this.image);
    },
    
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
