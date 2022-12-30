import { doc, addDoc, updateDoc,collection,serverTimestamp } from 'firebase/firestore/lite'; // orderBy
import { db,auth } from "./firebase"
import { insererDictionnaire } from "./dictionnaire"
import { uploadFile } from "./fileManager"
import { getUserInfoByUid } from "./authentification"
 
export async function publish(titreTache,description,niveauTache,disciplineTache,visibilite,document) {
  const uid = auth.currentUser.uid;
  const userInfo = await getUserInfoByUid(uid);

  const userData = userInfo.data();
  const nom = userData.name.concat(" ").concat(userData.lastName);
  const initial = userData.initial;
  const couleur = userData.color;
  const collectionRef = collection(db,"tache");
    
  // TODO verification des entres 

  const payload = {titreTache,description,niveauTache,disciplineTache,visibilite,document:"",uid,timestamp:serverTimestamp(),
                    nom:nom,initial:initial,couleur:couleur, delete:false};

  const docRef = await addDoc(collectionRef,payload);

  // actualiser le champ document
  if(document.name !== undefined) {
    const pathFile = "taches/".concat(uid,"/",docRef.id,"/",document.name)
    updateDoc(docRef, { document:pathFile })
    uploadFile(document,docRef.id);
  }

  // entree pour la collection recherche
  let tache = new Tache(titreTache,niveauTache,disciplineTache,nom,initial,description,docRef.id);
  insererDictionnaire(tache);
}  

// TODO mettre a jour le dictionnaire
export async function modifierTache(idTache,titreTache,description,niveauTache,disciplineTache,visibilite,document) {
  const tacheRef = doc(db,"tache", idTache);
  let payload = {titreTache,description,niveauTache,disciplineTache,visibilite,timestamp:serverTimestamp()};
  if(document != undefined) {
    console.log("document", document, "== undifined ? should not appear");
    payload = {titreTache,description,niveauTache,disciplineTache,visibilite,document,timestamp:serverTimestamp()};
  }
  return updateDoc(tacheRef,payload);
}

export async function setPrivate(idTache) {
  const tacheRef = doc(db, "tache", idTache);
    await updateDoc(tacheRef, { visibilite:"Privée" });
}
export async function setPublic(idTache) {
  const tacheRef = doc(db, "tache", idTache);
    await updateDoc(tacheRef, { visibilite:"Public" });
}

// modifie la valeur delete a true
export async function supprimerTacheSoft(idTache) {
  const tacheRef = doc(db, "tache", idTache);
    await updateDoc(tacheRef, { delete:true });
}

class Tache {
  constructor(titreTache,niveauTache,disciplineTache,nom,initial,description,id){
    this.titreTache = titreTache;
    this.niveauTache = niveauTache;
    this.disciplineTache = disciplineTache;
    this.nom = nom;
    this.initial = initial;
    this.description = description;
    this.id = id;
  }
}


