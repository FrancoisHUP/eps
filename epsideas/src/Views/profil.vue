<template>
  <div>
    <toolbar
      @estResultat="ComponentResult()"
      @result="getResult"
      @mesIdees="ComponentMesIdees()"
      :avatar="avatarMoi"
      :couleur="couleurMoi"
      :nom="nomMoi"
      @voirNotification="voirNotification"
      :couleurNotification="couleurNotification"
    />

    <div
      v-if="estMesIdees || estFavoris || estModif || autre"
      style="width: 100%; height: 170px"
    >
      <barPhoto
        @profil="ComponentProfil()"
        :avatar="avatar"
        :couleur="couleur"
        :nom="nom"
        :autreUid="uidAutre"
        :moi="estmoi"
        style="
          width: 100%;
          height: 170px;
          position: fixed;
          top: 86px;
          mask: linear-gradient(black 7rem, transparent);
          -webkit-mask: linear-gradient(black 7rem, transparent);
          z-index: 1;
        "
      />
    </div>
    <div style="display: flex; position: relative; top: 86px">
      <div class="menu2" style="flex: 15%">
        <div class="menu" style="position: fixed">
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
          <div
            class="Rubriques"
            style="height: 60px"
            @click="ComponentProfil()"
          >
            <v-icon style="margin-right: 10px; color: #b71c1c">
              mdi-home-city</v-icon
            >
            <button class="text">Profil</button>
          </div>
          <div
            class="Rubriques"
            style="height: 60px"
            @click="ComponentMesIdees()"
          >
            <v-icon style="margin-right: 10px; color: #ffcc80">
              mdi-lightbulb-on</v-icon
            >
            <button class="text">Mes idées</button>
          </div>
          <div
            class="Rubriques"
            style="height: 60px"
            @click="ComponentFavoris()"
          >
            <v-icon style="margin-right: 10px; color: #ffd700">
              mdi-star-shooting</v-icon
            >
            <button class="text">Mes favoris</button>
          </div>
          <div
            class="Rubriques"
            style="height: 60px"
            @click="ComponentActualites()"
          >
            <v-icon style="margin-right: 10px; color: #0f64e2">
              mdi-newspaper-variant-multiple-outline
            </v-icon>
            <button class="text">Actualités</button>
          </div>
          <div
            class="Rubriques"
            style="height: 60px"
            @click="ComponentAbonnement()"
          >
            <v-icon style="margin-right: 10px; color: #8a2be2">
              mdi-account
            </v-icon>
            <button class="text">Abonnements</button>
          </div>
          <div class="Rubriques" style="height: 60px" @click="ComponentTop()">
            <v-icon size="30" style="margin-right: 10px; color: #228b22">
              mdi-arrow-up-bold</v-icon
            >
            <button class="text">Idées au top</button>
          </div>
        </div>
      </div>
      <div style="flex: 45%; margin-top: 60px">
        <div v-if="!seen && !estprofil && estMesIdees">
          <div style="margin-rigt: 20px; margin-left: 20px">
            <v-icon
              size="45"
              style="margin-right: 10px; margin-bottom: 10px; color: #ffcc80"
            >
              mdi-lightbulb-on</v-icon
            >
            <span
              style="
                font-weight: bold;
                font-size: 28px;
                font-family: IBM Plex Sans Thai Looped, sans-serif;
              "
              >Mes idées</span
            >
            <br />
            <hr style="margin-bottom: 40px" />

            <div
              v-if="message"
              style="
                margin: auto;
                width: 300px;
                background-color: azure;
                border-radius: 10px;
                text-align: center;
              "
            >
              <span
                style="
                  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
                  font-size: 24px;
                "
                >Cette liste est vide</span
              >
            </div>
          </div>
          <affichage-tache
            @modifier="modifier"
            @supprimer="afficherTachesMesIdees"
            @reload="afficherTachesMesIdees"
            :canSuppress="true"
            v-for="{
              title,
              des,
              visibilite,
              avatar,
              couleur,
              niveau,
              discipline,
              nomComplet,
              date,
              id,
              uid,
              document,
              like,
              dislike,
            } of tachesMesIdees"
            :id="id"
            :visibilite="visibilite"
            :nomComplet="nomComplet"
            :key="title"
            :date="date"
            :avatar="avatar"
            :couleur="couleur"
            :niveau="niveau"
            :discipline="discipline"
            :titreTache="title"
            :description="des"
            :uid="uid"
            :document="document"
            :likedNumber="like"
            :unlikedNumber="dislike"
          />
        </div>
        <div v-if="notification">
          <v-icon
            size="45"
            style="
              margin-right: 10px;
              margin-left: 10px;
              margin-bottom: 10px;
              color: #ffcc80;
            "
          >
            mdi-bell-ring</v-icon
          >
          <span
            style="
              font-weight: bold;
              font-size: 28px;
              font-family: IBM Plex Sans Thai Looped, sans-serif;
            "
            >Notifications de {{ nomMoi }}</span
          >
          <br />
          <hr
            style="margin-bottom: 20px; margin-left: 10px; margin-right: 10px"
          />
          <div
            v-if="notifDispo"
            style="
              margin: auto;
              width: 300px;
              background-color: azure;
              border-radius: 10px;
              text-align: center;
            "
          >
            <span
              style="
                font-family: 'IBM Plex Sans Thai Looped', sans-serif;
                font-size: 24px;
              "
              >Aucune notification disponible</span
            >
          </div>
          <affichage-notification
            v-for="{ idTache, notification, date } of notifications"
            :idTache="idTache"
            :date="date"
            :key="idTache"
            :notification="notification"
          />
        </div>
        <div v-if="estprofil">
          <affichage-profil />
        </div>
        <div v-if="seen && !estprofil">
          <poster-idee @annulerIdee="seenView()" @publieIdee="seenView()" />
        </div>
        <div v-if="!seen && !estprofil && estActualite && !estMesIdees">
          <div style="margin-rigt: 20px; margin-left: 20px">
            <v-icon
              size="45"
              style="margin-right: 10px; margin-bottom: 10px; color: #0f64e2"
            >
              mdi-newspaper-variant-multiple-outline
            </v-icon>
            <span
              style="
                font-weight: bold;
                font-size: 28px;
                font-family: IBM Plex Sans Thai Looped, sans-serif;
              "
              >Fil d'actualité</span
            >
            <br />
            <hr style="margin-bottom: 40px; margin-right: 20px" />
          </div>

          <affichage-tache
            @autreUtilisateur="afficherTachesAutreUtilisateur"
            @reload="afficherTachesActualite"
            :canSuppress="false"
            v-for="{
              title,
              des,
              avatar,
              couleur,
              niveau,
              discipline,
              nomComplet,
              date,
              uid,
              id,
              document,
              like,
              dislike,
            } of tachesActualite"
            :id="id"
            :uid="uid"
            :nomComplet="nomComplet"
            :date="date"
            :key="title"
            :avatar="avatar"
            :couleur="couleur"
            :niveau="niveau"
            :discipline="discipline"
            :titreTache="title"
            :description="des"
            :document="document"
            :likedNumber="like"
            :unlikedNumber="dislike"
          />
        </div>
        <div
          v-if="
            !seen &&
            !estprofil &&
            !estActualite &&
            !estMesIdees &&
            estAbonnement
          "
        >
          <div style="margin-rigt: 20px; margin-left: 20px">
            <v-icon
              size="45"
              style="margin-right: 10px; margin-bottom: 10px; color: #8a2be2"
            >
              mdi-account
            </v-icon>
            <span
              style="
                font-weight: bold;
                font-size: 28px;
                font-family: IBM Plex Sans Thai Looped, sans-serif;
              "
              >Abonnements</span
            >
            <br />
            <hr style="margin-bottom: 40px; margin-right: 20px" />
          </div>
          <div
            v-if="messageAbonne"
            style="
              margin: auto;
              max-width: 640px;
              background-color: azure;
              border-radius: 10px;
              text-align: center;
            "
          >
            <span
              style="
                font-family: 'IBM Plex Sans Thai Looped', sans-serif;
                font-size: 24px;
              "
              >Cette liste est vide car vous n'avez aucun abonnement</span
            >
          </div>
          <affichage-tache
            @autreUtilisateur="afficherTachesAutreUtilisateur"
            @reload="ComponentAbonnement"
            :canSuppress="false"
            v-for="{
              title,
              des,
              avatar,
              couleur,
              niveau,
              discipline,
              nomComplet,
              date,
              uid,
              id,
              document,
              like,
              dislike,
            } of tachesAbonnements"
            :id="id"
            :uid="uid"
            :nomComplet="nomComplet"
            :date="date"
            :key="title"
            :avatar="avatar"
            :couleur="couleur"
            :niveau="niveau"
            :discipline="discipline"
            :titreTache="title"
            :description="des"
            :document="document"
            :likedNumber="like"
            :unlikedNumber="dislike"
          />
        </div>
        <div v-if="estTop">
          <div style="margin-rigt: 20px; margin-left: 20px">
            <v-icon
              size="45"
              style="margin-right: 10px; margin-bottom: 10px; color: #228b22"
            >
              mdi-arrow-up-bold
            </v-icon>
            <span
              style="
                font-weight: bold;
                font-size: 28px;
                font-family: IBM Plex Sans Thai Looped, sans-serif;
              "
              >Idées au top</span
            >
            <br />
            <hr style="margin-bottom: 40px; margin-right: 20px" />
          </div>
          <div
            v-if="messageTop"
            style="
              margin: auto;
              max-width: 640px;
              background-color: azure;
              border-radius: 10px;
              text-align: center;
            "
          >
            <span
              style="
                font-family: 'IBM Plex Sans Thai Looped', sans-serif;
                font-size: 24px;
              "
              >Cette liste est vide</span
            >
          </div>
          <affichage-tache
            @autreUtilisateur="afficherTachesAutreUtilisateur"
            @reload="afficherTachesTop"
            :canSuppress="true"
            v-for="{
              title,
              des,
              avatar,
              couleur,
              niveau,
              discipline,
              nomComplet,
              date,
              uid,
              id,
              document,
              like,
              dislike,
            } of tachesTopIdees"
            :id="id"
            :uid="uid"
            :nomComplet="nomComplet"
            :date="date"
            :key="title"
            :avatar="avatar"
            :couleur="couleur"
            :niveau="niveau"
            :discipline="discipline"
            :titreTache="title"
            :description="des"
            :document="document"
            :likedNumber="like"
            :unlikedNumber="dislike"
          />
        </div>
        <div v-if="estModif">
          <modifier-tache
            @annuler="annuler"
            :id="idModification"
            @confirmer="confirmer"
          />
        </div>
        <div
          v-if="
            !seen && !estprofil && !estActualite && !estMesIdees && estResultat
          "
        >
          <div style="margin-rigt: 20px; margin-left: 20px">
            <v-icon size="45" style="margin-right: 10px; margin-bottom: 10px">
              mdi-magnify</v-icon
            >
            <span
              style="
                font-weight: bold;
                font-size: 28px;
                font-family: IBM Plex Sans Thai Looped, sans-serif;
              "
              >Résultats de la recherche pour "{{ resultat }}"</span
            >
            <br />
            <hr style="margin-bottom: 40px; margin-right: 20px" />
          </div>
          <div
            v-if="messageRecherche"
            style="
              margin: auto;
              width: 300px;
              background-color: azure;
              border-radius: 10px;
              text-align: center;
            "
          >
            <span
              style="
                font-family: 'IBM Plex Sans Thai Looped', sans-serif;
                font-size: 24px;
              "
              >Aucun résultat pour cette recherche</span
            >
          </div>
          <affichage-tache
            @autreUtilisateur="afficherTachesAutreUtilisateur"
            :canSuppress="false"
            v-for="{
              title,
              des,
              avatar,
              couleur,
              niveau,
              discipline,
              nomComplet,
              date,
              id,
              uid,
              document,
              like,
              dislike,
            } of tachesRecherche"
            :nomComplet="nomComplet"
            :date="date"
            :key="title"
            :avatar="avatar"
            :couleur="couleur"
            :niveau="niveau"
            :discipline="discipline"
            :titreTache="title"
            :description="des"
            :id="id"
            :uid="uid"
            :document="document"
            :likedNumber="like"
            :unlikedNumber="dislike"
          />
        </div>
        <div
          v-if="
            !seen && !estprofil && !estActualite && !estMesIdees && estFavoris
          "
        >
          <div style="margin-rigt: 20px; margin-left: 20px">
            <v-icon size="45" style="margin-right: 10px; color: #ffd700">
              mdi-star-shooting</v-icon
            >
            <span
              style="
                font-weight: bold;
                font-size: 28px;
                font-family: IBM Plex Sans Thai Looped, sans-serif;
              "
              >Mes Favoris</span
            >
            <br />
            <hr style="margin-bottom: 40px; margin-right: 20px" />
            <div
              v-if="messageFavoris"
              style="
                margin: auto;
                width: 300px;
                background-color: azure;
                border-radius: 10px;
                text-align: center;
              "
            >
              <span
                style="
                  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
                  font-size: 24px;
                "
                >Cette liste est vide</span
              >
            </div>
          </div>
          <affichage-tache
            @autreUtilisateur="afficherTachesAutreUtilisateur"
            @reload="ComponentFavoris"
            :canSuppress="false"
            v-for="{
              title,
              des,
              avatar,
              couleur,
              niveau,
              discipline,
              nomComplet,
              date,
              id,
              uid,
              document,
              like,
              dislike,
            } of tachesMesFavoris"
            :nomComplet="nomComplet"
            :date="date"
            :key="title"
            :avatar="avatar"
            :couleur="couleur"
            :niveau="niveau"
            :discipline="discipline"
            :titreTache="title"
            :description="des"
            :id="id"
            :uid="uid"
            :document="document"
            :likedNumber="like"
            :unlikedNumber="dislike"            
          />
        </div>
        <div v-if="autre && !estActualite">
          <v-icon
            size="45"
            style="margin-right: 10px; margin-bottom: 10px; color: #ffcc80"
          >
            mdi-lightbulb-on</v-icon
          >
          <span
            style="
              font-weight: bold;
              font-size: 28px;
              font-family: IBM Plex Sans Thai Looped, sans-serif;
            "
            >Les idées de {{ nom }}</span
          >
          <br />
          <hr style="margin-bottom: 40px" />
          <affichage-tache
            :canSuppress="false"
            @reload="afficherTachesAutreUtilisateur"
            v-for="{
              title,
              des,
              avatar,
              niveau,
              discipline,
              nomComplet,
              date,
              id,
              uid,
              couleur,
              document,
              like,
              dislike,
            } of tachesAutreUtilisateur"
            :nomComplet="nomComplet"
            :date="date"
            :key="title"
            :avatar="avatar"
            :niveau="niveau"
            :discipline="discipline"
            :titreTache="title"
            :description="des"
            :id="id"
            :uid="uid"
            :couleur="couleur"
            :document="document"
            :likedNumber="like"
            :unlikedNumber="dislike"
          />
        </div>
      </div>
      <div
        class="menu2"
        style="flex: 20%; padding-top: 40px; text-align: center"
      >
        <v-btn
          id="posterMini"
          v-if="!seen && !estprofil"
          class="white--text"
          color="#0F64E2"
          @click="seenView()"
          style="
            height: 50px;
            width: 50px;
            font-family: IBM Plex Sans Thai Looped, sans-serif;
            font-weight: bold;
          "
        >
          <v-icon size="40" style="color: white; padding: 20px"
            >mdi-lightbulb-on</v-icon
          >
        </v-btn>
        <v-btn
          v-if="!seen && !estprofil && !estModif"
          id="posterMax"
          class="white--text"
          color="#0F64E2"
          @click="seenView()"
          style="
            font-family: IBM Plex Sans Thai Looped, sans-serif;
            font-weight: bold;
          "
        >
          Poster une idée
        </v-btn>
        <div v-if="estprofil == true">
          <v-btn
            class="white--text"
            color="#0F64E2"
            @click="retour()"
            style="
              font-family: IBM Plex Sans Thai Looped, sans-serif;
              font-weight: bold;
              width: 50%;
              margin-bottom: 40px;
            "
          >
            Retour
          </v-btn>
          <br />

          <v-row justify="center">
            <v-btn
              id="supMini"
              class="white--text"
              color="#0F64E2"
              @click.stop="dialog = true"
              style="
                height: 50px;
                width: 50px;
                font-family: IBM Plex Sans Thai Looped, sans-serif;
                font-weight: bold;
                margin-bottom: 40px;
              "
            >
              <span><v-icon color="white">mdi-trash-can-outline</v-icon></span>
            </v-btn>
            <v-btn
              id="supMax"
              class="white--text"
              color="#0F64E2"
              @click.stop="dialog = true"
              style="
                font-family: IBM Plex Sans Thai Looped, sans-serif;
                font-weight: bold;
                margin-bottom: 40px;
              "
            >
              <span>Supprimer mon compte</span>
            </v-btn>

            <v-dialog v-model="dialog" max-width="290">
              <v-card style="padding-top: 20px">
                <v-card-text
                  style="
                    font-family: IBM Plex Sans Thai Looped, sans-serif;
                    font-size: 24px;
                    margin-bottom: 40px;
                  "
                >
                  Êtes-vous sûr de vouloir supprimer votre compte?
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="blue darken-1" text @click="supprimerCompte()">
                    Oui
                  </v-btn>

                  <v-btn color="red darken-1" text @click="dialog = false">
                    Non
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toolbar from "../components/toolbar.vue";
import barPhoto from "../components/barPhoto.vue";
import posterIdee from "../components/posterIdee.vue";
import affichageTache from "../components/affichageTache.vue";
import PosterIdee from "../components/posterIdee.vue";
import affichageProfil from "../components/affichageProfil.vue";
import modifierTache from "../components/modifierTache.vue";
import affichageNotification from "../components/affichageNotification.vue";

import { getUserInfoByUid } from "../scripts/authentification"
import { getAuth, deleteUser } from "firebase/auth";
import * as fb from "../scripts/firebase";
import * as utils from "../scripts/utils";
import * as favoris from "../scripts/favoris";
import { rechercherDictionnaire } from "../scripts/dictionnaire";
import { getAbonnement } from "../scripts/abonnement";


export default {
  name: "HelloWorld",

  data: () => {
    return {
      notifications: [
        {
          idTache: "1",
          notification: "a aimé votre publication",
          date: "Avril 2002",
        },
        {
          idTache: "1",
          notification: "a aimé votre tache",
          date: "Avril 2002",
        },
        { idTache: "1", notification: "a aimé votre idée", date: "Avril 2002" },
        {
          idTache: "1",
          notification: "a aimé votre publication",
          date: "Avril 2002",
        },
      ],
      tachesMesIdees: [],
      tachesTopIdees: [],
      tachesActualite: [],
      tachesRecherche: [],
      tachesMesFavoris: [],
      tachesAbonnements: [],
      tachesAutreUtilisateur: [],
      nom: "",
      seen: false,
      estResultat: false,
      estprofil: false,
      estMesIdees: false,
      estActualite: true,
      estAbonnement: false,
      dialog: false,
      resultat: "",
      estFavoris: false,
      estModif: false,
      couleur: String,
      avatar: String,
      message: false,
      messageAbonne: false,
      messageFavoris: false,
      idModification: String,
      autre: false,
      uidAutre: "",
      avatarAutre: "",
      couleurAutre: "",
      nomAutre: "",
      estmoi: true,
      avatarMoi: "",
      couleurMoi: "",
      nomMoi: "",
      notifDispo: false,
      notification: false,
      estTop: false,
      messageTop: false,
    };
  },

  components: {
    toolbar,
    // MeNu,
    barPhoto,
    posterIdee,
    affichageTache,
    PosterIdee,
    affichageProfil,
    modifierTache,
    affichageNotification,
  },
  methods: {
    afficherTachesTop() {
      fb.getTopIdees().then((listTache) => {
        this.tachesTopIdees = [];
        const listDocuments = listTache.docs;
        const dataDocuments = utils.getDatasFromDocument(listDocuments);
        for (let i = 0; i < dataDocuments.length; i++) {
          if(dataDocuments[i].delete == false && dataDocuments[i].like != 0 )
          this.updateTache(dataDocuments[i], this.tachesTopIdees);
        }
        if (this.tachesTopIdees.length == 0) this.messageTop = true;
        else this.messageTop = false;
        this.UserMoi();
      });
    },
    ComponentTop() {
      this.estTop = true;
      this.estAbonnement = false;
      this.estModif = false;
      this.notification = false;
      this.estprofil = false;
      this.estActualite = false;
      this.estResultat = false;
      this.estMesIdees = false;
      this.estFavoris = false;
      this.autre = false;
      this.afficherTachesTop();
      this.scrollToTop();
    },
    ComponentAbonnement() {
      this.afficherTachesAbonnement();
      this.estTop = false;
      this.estAbonnement = true;
      this.estModif = false;
      this.notification = false;
      this.estprofil = false;
      this.estActualite = false;
      this.estResultat = false;
      this.estMesIdees = false;
      this.estFavoris = false;
      this.autre = false;
      if (this.tachesAbonnements.length == 0) this.messageAbonne = true;
      else this.messageAbonne = false;
      this.scrollToTop();
    },
    async afficherTachesMesIdees() {
      fb.getAllUserTache(fb.auth.currentUser.uid).then((listTache) => {
        const listDocuments = listTache.docs;
        const dataDocuments = utils.getDatasFromDocument(listDocuments);
        const sortedData = utils.sortByTime(dataDocuments);

        if (sortedData.length == 0) this.message = true;
        else this.message = false;
        this.tachesMesIdees = [];
        for (let i = 0; i < sortedData.length; i++) {
          this.updateTache(sortedData[i], this.tachesMesIdees);
        }
      });
    },
    async afficherTachesAutreUtilisateur(value) {
      this.estmoi = false;
      this.estResultat = false;
      this.estAbonnement = false;
      this.estTop = false;
      this.UserMoi();
      this.uidAutre = value;
      getUserInfoByUid(this.uidAutre).then((userInfo) => {
        this.couleur = userInfo.data().color;
        this.avatar = userInfo.data().initial;
        this.nom = userInfo
          .data()
          .name.concat(" ")
          .concat(userInfo.data().lastName);

        this.autre = true;
      });
      fb.getAllUserAutre(this.uidAutre).then((listTache) => {
        const listDocuments = listTache.docs;
        const dataDocuments = utils.getDatasFromDocument(listDocuments);
        const sortedData = utils.sortByTime(dataDocuments);
        if (sortedData.length == 0) this.message = true;
        else this.message = false;
        //console.log(this.message);
        this.tachesAutreUtilisateur = [];
        for (let i = 0; i < sortedData.length; i++) {
          this.updateTache(sortedData[i], this.tachesAutreUtilisateur);
        }
      });
      this.estActualite = false;
      this.notification = false;
      this.scrollToTop();
    },
    async afficherTachesActualite() {
      fb.getAllPublicTache().then((listTache) => {
        this.tachesActualite = [];
        const listDocuments = listTache.docs;
        const dataDocuments = utils.getDatasFromDocument(listDocuments);
        const sortedData = utils.sortByTime(dataDocuments);
        for (let i = 0; i < sortedData.length; i++) {
          const uid = fb.auth.currentUser.uid;
          if (sortedData[i].uid != uid) {
            this.updateTache(sortedData[i], this.tachesActualite);
          }
        }
        this.UserMoi();
      });
    },
    async afficherTachesFavoris() {
      this.tachesMesFavoris = [];
      const snapShotTaches = await fb.getAllPublicTache();
      const favorisTacheId = await favoris.getFavoris(fb.auth.currentUser.uid);

      if(favorisTacheId.length != 0) {
        const sortedData = utils.getDatasFromDocumentSortedByTime(snapShotTaches.docs);
        for(let data of sortedData) {
          if(favorisTacheId.includes(data.id)) {
            this.updateTache(data, this.tachesMesFavoris);
          }
        }
      }
      if(this.tachesMesFavoris.length == 0) { this.messageFavoris = true;}
      else { this.messageFavoris = false ;}
    },
    async afficherTachesAbonnement() {
      this.tachesAbonnements = [];
      const snapShotTaches = await fb.getAllPublicTache();
      const abonnementUid = await getAbonnement(fb.auth.currentUser.uid);
      if(abonnementUid.length != 0) {
        const sortedData = utils.getDatasFromDocumentSortedByTime(snapShotTaches.docs);
        for(let data of sortedData) {
          if(abonnementUid.includes(data.uid)) {
            this.updateTache(data, this.tachesAbonnements);
          }
        }
        if(this.tachesAbonnements.length == 0) { this.messageAbonne = true;}
        else { this.messageAbonne = false ;}
      }
     
    },
    updateTache(data, container) {
      const date = utils.getDateFromTimestamp(data.timestamp);
      container.push({
        dislike: data.dislike,
        like: data.like,
        uid: data.uid,
        id: data.id,
        visibilite: data.visibilite,
        title: data.titreTache,
        des: data.description,
        avatar: data.initial,
        couleur: data.couleur,
        niveau: data.niveauTache,
        discipline: data.disciplineTache,
        nomComplet: data.nom,
        date: date,
        document: data.document,
      });
    },
    confirmer() {
      this.estModif = false;
      this.estMesIdees = true;
      this.ComponentMesIdees();
    },
    annuler() {
      this.estModif = false;
      this.estMesIdees = true;
    },
    getResult(value) {
      this.resultat = value;
    },
    supprimerCompte() {
      this.displayComponentEditSupprimer();
      const auth = getAuth();
      const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          console.log("User deleted.");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    displayComponentEditSupprimer() {
      this.$router.push("/");
    },
    seenView() {
      //console.log(this.seen);
      this.estModif = false;
      this.notification = false;
      this.estTop = false;
      this.seen = !this.seen;
      this.estprofil = false;
      this.estActualite = true;
      this.estResultat = false;
      this.estMesIdees = false;
      this.estFavoris = false;
      this.autre = false;
      this.estAbonnement = false;
      this.afficherTachesActualite();
    },
    modifier(value) {
      this.findUser();
      this.UserMoi();
      this.seen = false;
      this.estMesIdees = false;
      this.estTop = false;
      this.notification = false;
      this.estprofil = false;
      this.estActualite = false;
      this.estResultat = false;
      this.estFavoris = false;
      this.estModif = true;
      this.autre = false;
      this.idModification = value;
      this.estAbonnement = false;
      //console.log(this.estModif);
    },
    ComponentProfil() {
      this.findUser();
      this.UserMoi();
      this.estMesIdees = false;
      this.estTop = false;
      this.estFavoris = false;
      this.estAbonnement = false;
      this.estModif = false;
      this.notification = false;
      this.estprofil = true;
      this.scrollToTop();
    },
    ComponentMesIdees() {
      this.findUser();
      this.UserMoi();
      this.estmoi = true;
      this.estAbonnement = false;
      this.estTop = false;
      this.notification = false;
      this.afficherTachesMesIdees();
      //console.log("button pressed");
      this.estprofil = false;
      this.estModif = false;
      this.estMesIdees = true;
      this.seen = false;
      this.estActualite = false;
      this.estResultat = false;
      this.estFavoris = false;
      this.autre = false;
      this.scrollToTop();
    },
    displayComponentFavoris() {
      //console.log("button pressed");
      this.$router.push("/profil").catch(() => {});
    },
    retour() {
      this.estprofil = false;
      this.estModif = false;
      this.seen = false;
      this.estAbonnement = false;
      this.estTop = false;
      this.notification = false;
      this.estActualite = true;
      this.estFavoris = false;
      this.autre = false;
      this.scrollToTop();
    },
    ComponentActualites() {
      this.seen = false;
      this.estMesIdees = false;
      this.estModif = false;
      this.estTop = false;
      this.estprofil = false;
      this.estActualite = true;
      this.estResultat = false;
      this.notification = false;
      this.estFavoris = false;
      this.estAbonnement = false;
      this.autre = false;
      this.scrollToTop();
    },
    ComponentResult() {
      this.tachesRecherche = [];
      rechercherDictionnaire(this.resultat).then((listTache) => {
        //const listDocuments = listTache.docs;
        //console.log(listTache)
        for (let i = 0; i < listTache.length; i++) {
          this.updateTache(listTache[i], this.tachesRecherche);
        }
      });
      this.UserMoi();
      this.seen = false;
      this.estMesIdees = false;
      this.estprofil = false;
      this.estActualite = false;
      this.estResultat = true;
      this.estTop = false;
      this.estModif = false;
      this.estAbonnement = false;
      this.notification = false;
      this.estFavoris = false;
      this.autre = false;
      this.scrollToTop();
    },
    ComponentFavoris() {
      this.findUser();
      this.afficherTachesFavoris();
      this.estmoi = true;
      this.seen = false;
      this.estMesIdees = false;
      this.estprofil = false;
      this.estActualite = false;
      this.estTop = false;
      this.estResultat = false;
      this.estFavoris = true;
      this.notification = false;
      this.estAbonnement = false;
      this.estModif = false;
      this.autre = false;
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    findUser() {
      this.UserMoi();
      const uid = fb.auth.currentUser.uid;
      if (uid != null)
        getUserInfoByUid(uid).then((userInfo) => {
          this.couleur = userInfo.data().color;
          this.avatar = userInfo.data().initial;
          this.nom = userInfo
            .data()
            .name.concat(" ")
            .concat(userInfo.data().lastName);

          this.autre = false;
        });
    },
    UserMoi() {
      const uid = fb.auth.currentUser.uid;
      if (uid != null)
        getUserInfoByUid(uid).then((userInfo) => {
          this.couleurMoi = userInfo.data().color;
          this.avatarMoi = userInfo.data().initial;
          this.nomMoi = userInfo
            .data()
            .name.concat(" ")
            .concat(userInfo.data().lastName);
        });
    },
    voirNotification() {
      if (this.notifications.length === 0) {
        this.notifDispo = true;
      } else this.notifDispo = false;
      this.notification = true;
      this.estmoi = true;
      this.estprofil = false;
      this.estModif = false;
      this.estMesIdees = false;
      this.seen = false;
      this.estActualite = false;
      this.estTop = false;
      this.estResultat = false;
      this.estFavoris = false;
      this.estAbonnement = false;
      this.autre = false;
      this.scrollToTop();
      this.UserMoi();
    },
  },

  beforeMount() {
    this.afficherTachesActualite();
    this.findUser();
  },
  computed: {
    couleurNotification() {
      if (this.notifications.length !== 0) return "red";
      else return "";
    },
    avatarColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    messageRecherche() {
      if (this.tachesRecherche.length == 0) return true;
      else return false;
    },
  },
};
</script>

<style scoped>
.menu2 {
  background-color: rgba(211, 211, 211, 0.103);
}
.menu {
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-size: 24px;
  margin-top: 3px;
  margin-left: 3px;
  padding: 10px;
  height: 100%;
}
.Rubriques:hover {
  color: #0f64e2;
  background-color: azure;
}

@media only screen and (max-width: 930px) {
  .text {
    display: none;
  }
  .menu2 {
    width: 12%;
  }
  #posterMini {
    visibility: visible;
  }
  #posterMax {
    display: none;
  }
  #supMax {
    display: none;
  }
  #supMini {
    visibility: visible;
  }
}
@media only screen and (min-width: 930px) {
  #posterMini {
    display: none;
  }
  #supMini {
    display: none;
  }
}
@media only screen and (max-width: 660px) {
  #posterMini {
    display: none;
  }
}
</style>
