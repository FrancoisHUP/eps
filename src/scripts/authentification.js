import { doc,setDoc,getDoc } from 'firebase/firestore/lite'; // orderBy
import { createUserWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import { generateLightColorHex } from "./utils"
import { db,auth } from "./firebase"

export async function getUserInfoByUid(uid) {
  const docRef = doc(db, "userInfo", uid);
  return getDoc(docRef).then(userInfo => {
    return userInfo;
  });
}

export async function register(email,password,name,lastName) {
  return createUserWithEmailAndPassword(auth, email, password).then(() => {
      return addingUserInfoToUserTable(name,lastName,email)});
}

async function addingUserInfoToUserTable(name,lastName,email) {
const color = generateLightColorHex();
const initial = (name.charAt(0).concat(lastName.charAt(0))).toUpperCase();
const docRef = doc(db, "userInfo", auth.currentUser.uid)
const payload = {name: name, lastName: lastName, email: email, color:color, initial:initial};
  await setDoc(docRef, payload);
}

export function resetPassword(email){
sendPasswordResetEmail(auth, email)
      .then(() => {
      console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
});  
}
