import { doc,updateDoc,collection,addDoc,serverTimestamp,where,query,getDocs } from 'firebase/firestore/lite'; 
import { db } from "./firebase"

export async function supprimerComment(idComment) {
  const tacheRef = doc(db, "commentaires", idComment);
  await updateDoc(tacheRef, { "deleted":true});
}

export async function sendComment(avatar,commentaire,nomComplet,id,uid,couleur) {
  const collectionRef = collection(db,"commentaires");
  addDoc(collectionRef,{initial :  avatar, comment: commentaire,name : nomComplet, idMessage : id,couleur :couleur,uid :uid,timestamp:serverTimestamp(),deleted:false}).then( () => {
  });
}

export async function getComments(id) {
  const q = query(collection(db,"commentaires"), where("idMessage", "==" , id),where("deleted", "==" , false) );
  return getDocs(q);
}
