//import { doc,setDoc,getDoc,updateDoc,arrayUnion,arrayRemove  } from 'firebase/firestore/lite'; 
 import { doc,setDoc } from 'firebase/firestore/lite';
import { db } from "./firebase"

export async function addLikeNotification(idTache,monUid,otherId) {
  
  const notifRef = doc(db, "notification", monUid, "userNotification");
  const docSnap = await setDoc(notifRef,);

  console.log("idTache : ", idTache,"monUid : ",monUid,"otherId : ",otherId);
  console.log(idTache,monUid,docSnap);
}