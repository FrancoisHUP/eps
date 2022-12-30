import { doc,setDoc,getDoc,updateDoc,arrayRemove,arrayUnion } from 'firebase/firestore/lite'; 
import { db,auth } from "./firebase"

export async function checkAbonnement(otherUid) {
  const docRef = doc(db, 'abonnement',auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  let abonne=false;
  if (docSnap.exists()) {
    if(docSnap.data().abonnement.includes(otherUid)) {
      abonne=true;
    }
  } 
  return abonne;
}

export async function removeAbonnement(otherUid) {
  const docRef = doc(db, 'abonnement',auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    updateDoc(docRef,{"abonnement":arrayRemove(otherUid)})
  } 
}

export async function addAbonnement(otherUid) {
  const docRef = doc(db, 'abonnement',auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    updateDoc(docRef,{"abonnement":arrayUnion(otherUid)})
  } else {
    //console.log("No such document!");
    setDoc(docRef,{"abonnement" : [otherUid]});
  }
}

export async function getAbonnement(monUid) {
  const docRef = doc(db, 'abonnement',monUid);
  const docSnap = await getDoc(docRef);

  let adonnementList=[];
  if (docSnap.exists()) {
    adonnementList = await docSnap.data().abonnement;
  } 
  return adonnementList;
}