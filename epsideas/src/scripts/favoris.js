import {doc,setDoc,getDoc, updateDoc,arrayUnion,arrayRemove } from 'firebase/firestore/lite'; 
import { db } from "./firebase"


export async function addFavori(tacheId,Uid) {
  const docRef = doc(db, 'favori', Uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    updateDoc(docRef,{"favoris":arrayUnion(tacheId)})
  } else {
    //console.log("No such document!");
      setDoc(docRef,{"favoris" : [tacheId]});
    }
}

export async function removeFavori(tacheId,Uid) {
  const docRef = doc(db, 'favori',Uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    updateDoc(docRef,{"favoris":arrayRemove(tacheId)})
  } 
}

export async function getFavoris(monUid) {
  const docRef = doc(db, 'favori',monUid);
  const docSnap = await getDoc(docRef);

  let favoris=[];
  if (docSnap.exists()) {
    favoris = docSnap.data().favoris;
  } 
  return favoris;
}


