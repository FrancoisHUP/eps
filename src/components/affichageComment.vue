<template>
  <div style="display: flex">
    <v-avatar
      :color="couleur"
      size="40"
      style="margin-left: 10px; margin-right: 10px"
      ><span style="color: black; font-size: 18px">
        {{ avatar }}</span
      ></v-avatar
    >
    <div>
      <div
        style="
          background-color: azure;
          margin-right: 10px;
          border: 1px solid azure;
          border-radius: 15px;
          padding: 10px;
          margin-bottom: 10px;
        "
      >
       <p style="font-weight: bold;font-size: 16px">
        {{ nom }}
      </p>
        <p style="font-size: 16px">
          {{ comment }}
        </p>
        <div style="text-align: right;">
        <span style="font-weight: normal;font-size: 12px">{{date}}</span>
        </div>
      </div>
    </div>
    <div v-if="authorized" style="margin-top: 35px">
      <button @click="dialog = true"><v-icon color="red">mdi-close</v-icon></button>
      <v-dialog v-model="dialog" max-width="290">
              <v-card style="padding-top: 20px">
                <v-card-text
                  style="
                    font-family: IBM Plex Sans Thai Looped, sans-serif;
                    font-size: 24px;
                    margin-bottom: 40px;
                  "
                >
                  Êtes-vous sûr de vouloir supprimer ce commentaire?
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="blue darken-1" text @click="supprimerCommentaire()">
                    Oui
                  </v-btn>

                  <v-btn color="red darken-1" text @click="dialog = false">
                    Non
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </div>
  </div>
</template>

<script>
import * as fb from "../scripts/firebase";
import { supprimerComment }  from "../scripts/commentaire" 
export default {
  name: "affichageComment",
  data:() =>{
    return {
      dialog : false,
    }
  },
  props: {
    idCom:String,
    uidComment:String,
    uidMessager:String,
    avatar: String,
    comment: String,
    nom: String,
    couleur: String,
    date:String
  },
  methods:{
    supprimerCommentaire(){
      this.dialog  = false;
      supprimerComment(this.idCom);
      this.$emit('refresh');
    }
  },
  computed: {
    authorized() {
      if(this.uidComment == fb.auth.currentUser.uid ||this.uidMessager == fb.auth.currentUser.uid)
      return true;
      else 
      return false;

    },
  },
};
</script>

<style scoped></style>
