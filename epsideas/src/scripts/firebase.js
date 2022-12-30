import { initializeApp } from 'firebase/app';
import { getFirestore,doc,getDoc, collection, getDocs, query, where, limit,orderBy } from 'firebase/firestore/lite'; // orderBy
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({   
    apiKey: "AIzaSyBMWJCj8Hzx5hE5w2qcuwyMTo63IuGiXK4",
    authDomain: "epsdb-c2130.firebaseapp.com",
    projectId: "epsdb-c2130",
    storageBucket: "epsdb-c2130.appspot.com",
    messagingSenderId: "99140231547",
    appId: "1:99140231547:web:234c03260a7e8f0bd35dde",
    measurementId: "G-4GD8PGGR3D"});

export const db = getFirestore(firebaseApp);
export const auth = getAuth();

// fonction pratique pour compiler sans avoir a enlever les imports
export function doNothing() {}

export async function getTopIdees(){
  const q = query(collection(db,"tache"), orderBy("like", "desc"), limit(5));
  return getDocs(q);
}

export async function getTache(idTache) {
  const docRef = doc(db,"tache", idTache);
  const document = await getDoc(docRef)
  return document
}

export async function getAllUserTache(uid) {
  //console.log(uid);
  const q = query(collection(db,"tache"), where("delete", "==" , false), where("uid", "==", uid));
  return getDocs(q);
}

export async function getAllUserAutre(uid) {
  //console.log(uid);
  const q = query(collection(db,"tache"), where("delete", "==" , false),where("visibilite", "==", "Public"), where("uid", "==", uid));
  return getDocs(q);
}

export async function getAllPublicTache() { 
    const q = query(collection(db,"tache")
      ,where("visibilite", "==", "Public"), where("delete", "==" , false),limit(100)
      );
      const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  
  export async function getAllTache() {
    return getDocs(collection(db,"tache"));
  }


  

