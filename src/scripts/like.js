import { doc,setDoc,getDoc,updateDoc,arrayUnion,arrayRemove } from 'firebase/firestore/lite'; 
import { db } from "./firebase"

export async function addLike(idTache,monUid) {
  addLikeToUser(idTache,monUid);
  addLikeTache(idTache);
  //updateNotifCollection(); // TODO
}

async function addLikeToUser(idTache,monUid) {
  const docRef = doc(db, 'like',monUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    updateDoc(docRef,{"likes":arrayUnion(idTache)})
  } else {
    setDoc(docRef,{"likes" : [idTache]});
  }
}

async function addLikeTache(idTache) {
  
  const tacheRef = doc(db, "tache", idTache);
  const docSnap = await getDoc(tacheRef);
  
  if (docSnap.exists()) {
    // get like number 
    let likeCount = docSnap.data().like
    if(typeof likeCount === "undefined") {
      likeCount=1;
    } else {
      likeCount = likeCount+1;
    }
    updateDoc(tacheRef, {"like":likeCount});
  }
}

export async function removeLike(idTache,monUid) {
  removeLikeToUser(idTache,monUid);
  removeLikeTache(idTache);
  //updateNotifCollection(); // TODO
}

async function removeLikeToUser(idTache,monUid) {
  const docRef = doc(db, 'like',monUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    updateDoc(docRef,{"likes":arrayRemove(idTache)})
  } 
}

async function removeLikeTache(idTache) {
  
  const tacheRef = doc(db, "tache", idTache);
  const docSnap = await getDoc(tacheRef);
  
  if (docSnap.exists()) {
    // get like number 
    let likeCount = docSnap.data().like-1;
    updateDoc(tacheRef, { "like":likeCount});
  } 
}

export async function addDisLike(idTache,monUid) {
  addDisLikeToUser(idTache,monUid);
  addDisLikeTache(idTache);
  //updateNotifCollection(); // TODO
}

async function addDisLikeToUser(idTache,monUid) {
  const docRef = doc(db, 'like',monUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    updateDoc(docRef,{"dislikes":arrayUnion(idTache)})
  } else {
    setDoc(docRef,{"dislikes" : [idTache]});
  }
}

async function addDisLikeTache(idTache) {
  
  const tacheRef = doc(db, "tache", idTache);
  const docSnap = await getDoc(tacheRef);
  
  if (docSnap.exists()) {
    // get like number 
    let dislikeCount = docSnap.data().dislike
    if(typeof dislikeCount === "undefined") {
      dislikeCount=1;
    } else {
      dislikeCount = dislikeCount+1;
    }
    updateDoc(tacheRef, {"dislike":dislikeCount});
  }
  
}

export async function removeDislike(idTache,monUid) {
  removeDislikeToUser(idTache,monUid);
  removeDislikeTache(idTache);
  //updateNotifCollection(); // TODO
}

async function removeDislikeToUser(idTache,monUid) {
  
  const docRef = doc(db, 'like',monUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    updateDoc(docRef,{"dislikes":arrayRemove(idTache)})
  } 
}

async function removeDislikeTache(idTache) {
  
  const tacheRef = doc(db, "tache", idTache);
  const docSnap = await getDoc(tacheRef);
  
  if (docSnap.exists()) {
    // get like number 
    let dislikeCount = docSnap.data().dislike-1;
    updateDoc(tacheRef, { "dislike":dislikeCount});
  } 
}

export async function getLikes(monUid) {
  const docRef = doc(db, 'like',monUid);
  const docSnap = await getDoc(docRef);

  let likedList=[];
  if (docSnap.exists()) {
    likedList = await docSnap.data().likes;
  } 
  return likedList;
}

export async function getDislikes(monUid) {
  const docRef = doc(db, 'like',monUid);
  const docSnap = await getDoc(docRef);

  let dislikedList=[];
  if (docSnap.exists()) {
    dislikedList = docSnap.data().dislikes;
  } 
  //console.log(dislikedList);
  return dislikedList;
}