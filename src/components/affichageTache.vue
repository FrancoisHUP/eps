<template>
  <div class="affTache">
    <div style="display: flex">
      <div style="flex: 20%; text-align: center">
        <button @click="autreUtilisateur()">
          <v-avatar :color="this.couleur" size="56"
            ><span style="color: black; font-size: 20px">
              {{ avatar }}</span
            ></v-avatar
          ><br />
          <span style="margin-bottom: 50px">{{ nomComplet }}</span></button
        ><br />
        <button @click="addFavoris()">
          <v-icon
            v-if="!estFavoris"
            background-color="orange lighten-3"
            color="orange"
            hover
            size="64"
            >mdi-star-outline</v-icon
          >
        </button>
        <button @click="removeFavoris()">
          <v-icon
            v-if="estFavoris"
            background-color="orange lighten-3"
            color="orange"
            hover
            size="64"
            >mdi-star</v-icon
          >
        </button>

        <br />
        <span> Favoris</span>
      </div>

      <div style="flex: 80%">
        <div>
          <span
            style="
              font-weight: bold;
              font-size: 24px;
              margin-right: 10px;
              margin-top: 20px;
            "
            >{{ titreTache }}
          </span>
          <button
            style="padding-bottom: 10px"
            v-if="visible && canSuppress && estMoi"
            @click="setPrivateTache()"
          >
            <v-icon style="color: #4285f4">mdi-lock-open-variant</v-icon>
          </button>

          <button
            style="padding-bottom: 10px"
            v-if="!visible && canSuppress && estMoi"
            @click="setPublicTache()"
          >
            <v-icon style="color: red"> mdi-lock-open</v-icon>
          </button>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                style="padding-bottom: 10px"
                v-bind="attrs"
                v-on="on"
                @click="downloadDocument()"
              >
                <a style="text-decoration: none" v-if="getDocument">
                  <v-icon color="primary">mdi-paperclip</v-icon>
                </a>
              </button>
            </template>
            <span>Une pièce jointe est disponible</span>
          </v-tooltip>
        </div>

        <div v-if="voir">
          <span style="font-size: 16px">{{ discipline }} </span><br />
          <span style="font-size: 12px">{{ niveau }} </span><br />
          <span style="font-size: 10px">{{ date }} </span><br />
        </div>
        <div v-if="!voir" @click="voir = true" style="font-size: 12px">
          <button>Afficher les détails...</button>
        </div>
        <div v-if="voir" @click="voir = false" style="font-size: 12px">
          <button>Masquer les détails...</button>
        </div>
        <div
          id="father"
          style="
            background-color: #fbf4f4;
            margin-top: 40px;
            text-align: justify;
            padding: 8px;
            max-width: 550px;
          "
          v-html="description"
        ></div>
        <div>
          <v-row
            style="
              margin-top: 40px;
              margin-bottom: 40px;
              padding-right: 60px;
              justify-content: end;
            "
          >
            <v-btn
              v-if="canSuppress && estMoi"
              style="margin-right: 20px"
              hover
              icon
              color="blue"
              @click="modifier"
            >
              <v-icon>mdi-pencil-plus</v-icon>
            </v-btn>

            <v-btn
              v-if="canSuppress && estMoi"
              color="red"
              style="margin-right: 20px"
              hover
              @click="dialog = true"
              icon
            >
              <v-icon>mdi-trash-can-outline</v-icon>
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
                  Êtes-vous sûr de vouloir supprimer cette tâche?
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="blue darken-1" text @click="supprimerTache()">
                    Oui
                  </v-btn>

                  <v-btn color="red darken-1" text @click="dialog = false">
                    Non
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn hover icon color="blue" @click="comment()">
              <v-icon>mdi-comment-processing-outline</v-icon>
            </v-btn>
            <div
              style="
                text-align: center;
                margin-left: 25px;
                display: flex;
                flex-direction: column;
              "
            >
              <div>
                <v-btn
                  v-if="!disliked"
                  hover
                  background-color="orange lighten-3"
                  icon
                  color="deep-orange"
                  id="dislikeFalse"
                  @click="addDislike()"
                  :disabled="liked"
                >
                  <v-icon>mdi-thumb-down-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="disliked"
                  hover
                  background-color="orange lighten-3"
                  icon
                  id="dislikeTrue"
                  color="deep-orange"
                  @click="removeDislike()"
                  :disabled="liked"
                >
                  <v-icon>mdi-thumb-down</v-icon>
                </v-btn>
              </div>
              <div>
                <span style="padding: 3px">{{ dislikeNumber }}</span>
              </div>
            </div>
            <div
              style="
                text-align: center;
                margin-left: 25px;
                display: flex;
                flex-direction: column;
              "
            >
              <div>
                <v-btn
                  v-if="!liked"
                  hover
                  icon
                  color="blue"
                  id="likeFalse"
                  @click="addLike()"
                  :disabled="disliked"
                >
                  <v-icon>mdi-thumb-up-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="liked"
                  hover
                  icon
                  color="blue"
                  id="likeTrue"
                  @click="removeLike()"
                  :disabled="disliked"
                >
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </div>
              <div>
                <span style="padding: 3px">{{ likeNumber }}</span>
              </div>
            </div>
          </v-row>
        </div>

        <div v-if="wantComment">
          <div>
            <hr style="margin-top: 10px; margin-bottom: 10px" />

            <div v-if="!voirComment" style="font-size: 12px">
              <button
                @click="
                  () => {
                    voirComment = true;
                    this.afficherComments();
                  }
                "
              >
                Afficher les commentaires...
              </button>
            </div>
            <div v-if="voirComment" style="font-size: 12px">
              <affichage-comment
                @refresh="refresh"
                v-for="{
                  avatar,
                  comment,
                  nom,
                  couleur,
                  uidComment,
                  idCom,
                  date,
                } in comments"
                :key="couleur"
                :uidComment="uidComment"
                :avatar="avatar"
                :comment="comment"
                :nom="nom"
                :couleur="couleur"
                :uidMessager="uid"
                :idCom="idCom"
                :date="date"
              />

              <button @click="voirComment = false" style="margin-top: 10px">
                Masquer les commentaires...
              </button>
            </div>
            <hr style="margin-top: 10px; margin-bottom: 10px" />
          </div>
          <v-text-field
            v-model="commentaire"
            label="Commentaire"
            placeholder="Saisir votre commentaire.."
            filled
            rounded
            dense
            @keyup.enter="send()"
          ></v-text-field>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import affichageComment from "../components/affichageComment.vue";
import * as utils from "../scripts/utils";
import * as fb from "../scripts/firebase";
import * as like from "../scripts/like";
import * as favoris from "../scripts/favoris";
import { sendComment,getComments } from "../scripts/commentaire"
import { getFile } from "../scripts/fileManager"
import { setPrivate,setPublic,supprimerTacheSoft } from "../scripts/tache"
import { getUserInfoByUid } from "../scripts/authentification"
//import * as notification from "../notification";

export default {
  data: () => {
    return {
      voir: false,
      voirComment: false,
      rating: 0,
      wantComment: false,
      visible: Boolean,
      commentaire: "",
      dialog: false,
      liked: false,
      disliked: false,
      estFavoris: false,
      couleurMoi: String,
      avatarMoi: String,
      nomMoi: String,
      monUid: String,
      likes: [],
      dislikes: [],
      comments: [],
      likeNumber: 0,
      dislikeNumber: 0,
      estMoi: false,
    };
  },
  components: {
    affichageComment,
  },
  props: {
    uid: String,
    id: String,
    visibilite: String,
    titreTache: String,
    description: String,
    discipline: String,
    niveau: String,
    avatar: String,
    couleur: String,
    nomComplet: String,
    date: String,
    document: String,
    canSuppress: {
      type: Boolean,
      default: false,
    },
    dislikedNumber: {
      default: 0,
    },
    likedNumber: {
      default: 0,
    },
  },
  computed: {
    generateLightColorHex() {
      let color = "#";
      for (let i = 0; i < 3; i++)
        color += (
          "0" +
          Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
        ).slice(-2);
      return color;
    },
    getDocument() {
      //console.log(this.id)
      //console.log(this.document);
      if (this.document === "") {
        //console.log("document undifined");
        return false;
      } else {
        //console.log("document defined");
        return true;
      }
    },
  },
  methods: {
    async getLikes() {
      this.likeNumber = this.likedNumber;
      const idTacheLiked = await like.getLikes(fb.auth.currentUser.uid);
      if (
        typeof idTacheLiked !== "undefined" &&
        idTacheLiked.includes(this.id)
      ) {
        this.liked = true;
      } else this.liked = false;
    },
    async getDislikes() {
      this.dislikeNumber = this.dislikedNumber;
      const idTacheDisliked = await like.getDislikes(fb.auth.currentUser.uid);
      if (
        typeof idTacheDisliked !== "undefined" &&
        idTacheDisliked.includes(this.id)
      ) {
        this.disliked = true;
      } else this.disliked = false;
    },
    async getFavoris() {
      const idTacheDisliked = await favoris.getFavoris(fb.auth.currentUser.uid);
      if (
        typeof idTacheDisliked !== "undefined" &&
        idTacheDisliked.includes(this.id)
      ) {
        this.estFavoris = true;
      } else this.estFavoris = false;
    },
    async addLike() {
      this.liked = true;
      like.addLike(this.id, this.monUid, this.uid);
      //notification.addLikeNotification(this.id, this.monUid,this.uid);
      this.likeNumber++;
    },
    removeLike() {
      this.liked = false;
      like.removeLike(this.id, this.monUid);
      this.likeNumber--;
    },
    addDislike() {
      this.disliked = true;
      like.addDisLike(this.id, this.monUid);
      this.dislikeNumber++;
    },
    removeDislike() {
      this.disliked = false;
      like.removeDislike(this.id, this.monUid);
      this.dislikeNumber--;
    },

    refresh() {
      this.voirComment = true;
      this.afficherComments();
    },
    async downloadDocument() {
      const documentUrl = await getFile(this.document);
      window.open(documentUrl, "_blank");
    },
    removeFavoris() {
      this.estFavoris = false;
      favoris.removeFavori(this.id, this.monUid);
      this.$emit("reload");
    },
    addFavoris() {
      this.estFavoris = true;
      favoris.addFavori(this.id, this.monUid);
      this.$emit("reload");
    },
    autreUtilisateur() {
      this.$emit("autreUtilisateur", this.uid);
    },
    lock() {
      //console.log(this.visibilite);
      if (this.visibilite == "Public") {
        this.visible = true;
      } else if (this.visibilite == "Privée") {
        this.visible = false;
      }
    },
    setPrivateTache() {
      this.visible = false;
      setPrivate(this.id);
    },
    setPublicTache() {
      this.visible = true;
      setPublic(this.id);
    },
    modifier() {
      this.$emit("modifier", this.id);
    },
    supprimerTache() {
      this.dialog = false;
      //console.log(this.id);
      supprimerTacheSoft(this.id)
        .then(() => {
          this.$emit("supprimer");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async send() {
      this.voirComment = true;
      sendComment(
        this.avatarMoi,
        this.commentaire,
        this.nomMoi,
        this.id,
        fb.auth.currentUser.uid,
        this.couleurMoi
      ).then(this.afficherComments());

      this.commentaire = "";
    },
    comment() {
      this.wantComment = !this.wantComment;
      this.commentaire = "";
    },
    rate() {
      if (this.rating == 1) this.rating = 0;
      else this.rating == 1;
    },
    async afficherComments() {
      getComments(this.id).then((listTache) => {
        const listDocuments = listTache.docs;
        const data = utils.getDatasFromDocument(listDocuments)
        const sortedInvertData = utils.sortByTimeInvert(data);
        this.comments = [];
        for (let i = 0; i < sortedInvertData.length; i++) {
          this.updateTache(sortedInvertData[i], this.comments);
        }
      });
    },
    updateTache(data, container) {
      const date = utils.getDateFromTimestamp(data.timestamp);
      container.push({
        idCom: data.id,
        uidComment: data.uid,
        avatar: data.initial,
        comment: data.comment,
        nom: data.name,
        couleur: data.couleur,
        date: date,
      });
    },
    UserMoi() {
      this.monUid = fb.auth.currentUser.uid;
      if (this.monUid != null)
        getUserInfoByUid(this.monUid).then((userInfo) => {
          this.couleurMoi = userInfo.data().color;
          this.avatarMoi = userInfo.data().initial;
          this.nomMoi = userInfo
            .data()
            .name.concat(" ")
            .concat(userInfo.data().lastName);
        });
      if (this.monUid == this.uid) this.estMoi = true;
    },
  },

  beforeMount() {
    /* TODO optimiation a faire ici, pour linstant ca appel nombreTacheAffiche * nombreLike. 
    Alors que ca pourrait appele 1*nombreLike (recuperer 1 fois au serveur et mettre dans un tab) */
    this.getLikes();
    this.getDislikes();
    this.getFavoris();
    /* ---------- */ 

    this.lock();
    this.UserMoi();
    this.afficherComments();
  },

  name: "affichageTache",
};
</script>

<style scoped>
::v-deep #father > p >img{
    max-width: 100%;
    height: auto;
}
::v-deep #father > p{
    max-width: 100%;
    height: auto;
    word-wrap: break-word;
}
::v-deep #father >iframe{
    width: 100%;
    height: 300px;
}
::v-deep #father >pre{
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
}
.affTache {
  font-family: IBM Plex Sans Thai Looped, sans-serif;
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
