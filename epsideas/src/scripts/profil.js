import { doc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore/lite'; // orderBy
import { db } from "./firebase"

export async function modifierProfil(nom,prenom,initial,id) {
  // update userInfo
  const userRef = doc(db, "userInfo", id);
  await updateDoc(userRef, { "name":nom , "lastName":prenom, "initial":initial});

  // update Tache
  const tacheCollRef = collection(db, "tache");
  const qTache = query(tacheCollRef, where("uid", "==", id)) 
  const snapshotQueryTache = await getDocs(qTache);

  snapshotQueryTache.forEach((document) => {
    const concatNomPrenom = nom.concat(" ").concat(prenom)
    const docRef = doc(db,"tache",document.id)
    updateDoc(docRef, { "nom":concatNomPrenom, "initial":initial } );
  })

  // update commentaire
  const commentaireCollRef = collection(db, "commentaires");
  const qCommentaire = query(commentaireCollRef, where("uid", "==", id)) 
  const snapshotQueryCommentaire = await getDocs(qCommentaire);

  snapshotQueryCommentaire.forEach((document) => {
    const concatNomPrenom = nom.concat(" ").concat(prenom)
    const docRef = doc(db,"commentaires",document.id)
    updateDoc(docRef, { "name":concatNomPrenom, "initial":initial } );
  })
}


