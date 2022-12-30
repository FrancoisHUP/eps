import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { auth } from "./firebase"

const storage = getStorage();

export async function uploadFile(file,tacheId) {
  if(file.name != "" && file.name != undefined) {
    const uid = auth.currentUser.uid;
    // taches/uid/idTache/nomFichier.pdf
    const path = "taches/".concat(uid,"/",tacheId,"/",file.name)
    const storageRef = ref(storage, path);

    let pathFile = ""
    await uploadBytes(storageRef, file).then((snapshot) => {
      pathFile = snapshot.ref.fullPath
    });
    return pathFile;
  }
  return "";
}

export async function getFile(document) {
  // Create a reference to the file we want to download
  if(document!=undefined) {
    const starsRef = ref(storage, document);
    
    // Get the download URL
    let returnUrl = ""
    await getDownloadURL(starsRef)
      .then((url) => {
        returnUrl= url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          console.log("File doesn't exist")
          break;
        case 'storage/unauthorized':
          console.log("User doesn't have permission to access the object")
          break;
        case 'storage/canceled':
          console.log("User canceled the upload")
          break;
        case 'storage/unknown':
          console.log("Unknown error occurred, inspect the server response")
          break;
      }
    });
    return returnUrl;
  }
}
