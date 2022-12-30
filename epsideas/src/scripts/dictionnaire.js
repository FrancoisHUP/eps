import { doc,setDoc,getDoc, collection, getDocs,query, where,updateDoc,arrayUnion,documentId, } from 'firebase/firestore/lite'; 
import { db } from "./firebase";
import * as utils  from './utils';

export function insererDictionnaire(tache) {
  const mots = perpRechercheMot(tache.titreTache,tache.niveauTache,tache.disciplineTache,tache.nom,tache.initial,tache.description);
  insertRechercheMot(tache.id,mots)
  insertMotDictionnaire(mots)
} 

export async function rechercherDictionnaire(resquest) {
  const motsPretraitement1 = parse(resquest)  
  const motsPretraitement2 = trimAndLowerCase(motsPretraitement1)
  const RechercheAugmente = await rechercheAugmente(motsPretraitement2)
  //console.log("RechercheAugmente : ", RechercheAugmente)
  
  // fouille dans la table de rechercheMot
  const ids = []
  await getContentById(RechercheAugmente,"rechercheMot").then(querySnapshot => {
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      //console.log("idsTache ajouter : ", doc.data().idsTache);
      for(const idTache of  doc.data().idsTache){
        ids.push(idTache)
      }
    });
  })

  //console.log(ids)
  
  let docs = []
   
  // Chercher les taches a partir des ids
  await getContentById(ids,"tache")
  .then(querySnapshot => {
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      data["id"] = doc.id 
      docs.push(data)
    });
  })
  //console.log("docs : ", docs)
  return docs
}

 export async function getContentById(ids, path) {
   
  // don't run if there aren't any ids or a path for the collection
  if (!ids || !ids.length || !path) return [];

  const collectionPath = collection(db, path)
  
  const batches = [];

  while (ids.length) {
    // firestore limits batches to 10
    const batch = ids.splice(0, 10);

    // add the batch request to to a queue
    const q = query(collectionPath, where(documentId(), 'in', batch ))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      batches.push(doc)
      //console.log(doc.id, " => ", doc.data());
    });
  }
  //console.log("first element : ", batches[0].data())
  //console.log("length : ", batches.length)
  // after all of the data is fetched, return it
  return batches
}

async function rechercheAugmente(mots) {
  // get Dictionnaire 
  const docRef = doc(db,"DictionnaireColl","DictionnaireDoc");
  const document = await getDoc(docRef);

  const dataDictionnaire = document.data();
  //console.log("dataDictionnaire : ", dataDictionnaire)
  let RechercheAugmente = [] 
  for(let mot of mots) {
    for(let motcle of Object.keys(dataDictionnaire)) {
      // si la difference de longueur des mots est plus grand que 2 alor on analyse pas 
      if(Math.abs(mot.length-motcle.length) < 3) {
        let distance = utils.getEditDistance(mot,motcle)
        //console.log("mot : ", mot, " & motcle : ",motcle," d=",distance)
        if(distance < 3) {
          RechercheAugmente.push(motcle);
        }
      }  
    }
  }
  return RechercheAugmente
}

async function insertMotDictionnaire(mots) {
  const docRef = doc(db,"DictionnaireColl","DictionnaireDoc");
  const dictionnaireData = (await getDoc(docRef)).data(); 
  //console.log(dictionnaireData.ballon.length);

  for(let i=0; i < mots.length; i++) {
    //console.log(Object.keys(dictionnaireData))
    const mot = mots[i];
    if(mot in dictionnaireData) {
      // TODO 
      let nombreOccurence = ++dictionnaireData[mot];
      updateDoc(docRef,{[mot]:nombreOccurence})
    } else {
      updateDoc(docRef,{[mot]:1})
    }
    //updateDoc(docRef,{[mot]:arrayUnion(idTache)})
  }
}

function perpRechercheMot(titreTache,niveauTache,disciplineTache,nom,initial,description) {
  let motsRecherche = {mots:[]} 
  pushWords(titreTache,motsRecherche);
  pushWords(niveauTache,motsRecherche);
  pushWords(disciplineTache,motsRecherche);
  pushWords(nom,motsRecherche); 
  pushWords(initial,motsRecherche); 
  pushWords(description,motsRecherche);
  return motsRecherche.mots;
} 

function pushWords(field, motsRecherche) {
  const determinants = ['le','les','la', ' ' , '', 'ma', 'mon','mes','ta','ton','tes','ses','nos','vos','leur',
  'son','notre','votre','leur', 'un', 'une','des','ce','cet','cette','ces']; 
  const pronom = ['je','tu','il','nous','vous', 'il', 'moi','toi','ils','elles','eux','on','en']
  const preposition = ['avec', 'dans','a','après','avant','chez','concernant','contre','dans','dès','durant','hormis','malgré','moyennant','pour' ]
  const conjonction = ['mais','ou','et','donc','car','ni','or']

  const blackList = determinants.concat(pronom).concat(preposition).concat(conjonction);
  const motsPreTraitement1 = parse(field);
  const motsPreTraitement2 = verifLongueur(motsPreTraitement1); // verifie la longueur 
  const motsPreTraitement3 = trimAndLowerCase(motsPreTraitement2); 
  const motsPreTraitement4 = retirerAccent(motsPreTraitement3);
  const mots = motContientRatioVoyelleConsonne(motsPreTraitement4); // si le mot contient un nombre raissonnable de voyelle

  
  //console.log("pre-trie : ", mots);
  for(let i =0; i < mots.length; i++) {
    const mot = mots[i].toLowerCase();

    // console.log("mot traiter : ",mot);
    if(mot.length < 2) { 
      //console.log(mot, " est ignore, car le mot est trop cours");
    } else if(blackList.includes(mot)) { 
      //console.log(mot, " est ignore, car il fait partie de la blacklist");
    } else if(motsRecherche.mots.includes(mot)) { 
      //console.log(mot, " apparait deja dans la liste.");
    } else {
      motsRecherche.mots.push(mot);   
    }
  }
}

function verifLongueur(mots) {
  const longueurMaxMot = 25 // anticonstitutionnellement 
  let motsValide = [];
  for(let mot of mots) {
    if(mot.length < longueurMaxMot) { 
      motsValide.push(mot);
    }
  }
  return motsValide;
}
 
function motContientRatioVoyelleConsonne(mots) {
  const voyelles = ["a","e","i","o","u","y"]
  let voyelle = 0;
  let consonne = 0;

  let motValide = [];
  for(let mot of mots) {
    for(let lettre of mot) {
      if(voyelles.includes(lettre)) {
        voyelle++;
      } else {
        consonne++;
      }
    }
    const ratio = voyelle/consonne; 
    if(ratio > 0.20) {
      motValide.push(mot);
    }
  }
  return motValide;
}


function retirerAccent(mots) {
  const aAccent = [ "à", "â", "ä" ] 
  const eAccent = [ "é", "è", "ê", "ë"] 
  const iAccent = [ "ï", "î"]
  const oAccent = [ "ô", "ö" ]
  const uAccent = [ "ù", "û", "ü" ]
  const yAccent = ["ÿ"]
  const cAccent = ["ç"]

  let motsSansAccent = []
  for(let mot of mots) {
    let motSansAccent = ""
    for(let i = 0 ; i < mot.length; i++) {
      let lettre = mot.charAt(i)
      
      if(aAccent.includes(lettre)) {
        lettre = "a"
      } else if(eAccent.includes(lettre)) {
        lettre = "e"
      } else if(iAccent.includes(lettre)) {
        lettre = "i"
      } else if(oAccent.includes(lettre)) {
        lettre = "o"
      } else if(uAccent.includes(lettre)) {
        lettre = "u"
      } else if(yAccent.includes(lettre)) {
        lettre = "y"
      } else if(cAccent.includes(lettre)) {
        lettre = "c"
      } 
      motSansAccent = motSansAccent+lettre
    }
    motsSansAccent.push(motSansAccent)
  }
  return motsSansAccent;
}
/*
String.prototype.replaceAt = function(index,replacement) {
  return this.substring(0,index) + replacement + this.substring(index+1);
}
*/

function trimAndLowerCase(mots){
  let motsResult = [] 
  for(let mot of mots) {
      let motPrep = mot.trim().toLowerCase();
      if(motPrep.length !== 0 ) {
          motsResult.push(motPrep);
      }
  }
  return motsResult;
}

function parse(field) {
  let mots = []
  if(typeof field === "string" || field instanceof String) {
    mots = field.split(/[., -!?,':\\<>/"[\]()’;]/);
  }
  return mots;
}

async function insertRechercheMot(idTache,motsRecherche) {
  const dictionnaireMot = await getDictionnaireMot();

  for(let i=0; i < motsRecherche.length; i++) {
    const mot = motsRecherche[i];
    const docRef = doc(db,"rechercheMot",mot);

    if(dictionnaireMot.includes(mot)) {
      await updateDoc(docRef,{
        idsTache:arrayUnion(idTache)
      })
    } else {
      await setDoc(docRef,{
        idsTache:[idTache],
        mot:mot
      })
    }
  }
}

async function getDictionnaireMot() {
  let set = []
  const docRef = collection(db,"rechercheMot");
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    set.push(doc.id)
  })
  return set;
}

