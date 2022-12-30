/*
Serie de test unitaire pour la securite de la base de donnees

pour lancer : 
- Dans le repertoir principale lance : 
- $ firebase emulators:start
    - si ca foncitonne pas il faut installer firebase : 
    - $ npm install -g firebase-tools
    - $ firebase --version
    - et puis il faut se login a firebase : 
    - $ firebase login 
- aller dans le repertoire epsideas/test
- $ npm test firebaseTest
*/

const assert = require('assert');
const firebase = require('@firebase/testing')

//const assert = require('chai').assert;
//const index = require('../src/index')

const EPS_ID = "epsdb-c2130";
const myId = "user_abc";
const theirId = "user_xyz";
const modId= "user_mod";
const myAuth = {uid:myId, email:"abc@gmail.com"};
//const modAuth = {uid:modId, email:"mod@gmail.com", isModerador:true};


function getFirestore(auth) {
    return firebase.initializeTestApp({projectId: EPS_ID, auth: auth}).firestore();
}
function getAdminFirestore() {
    return firebase.initializeAdminApp({projectId:EPS_ID}).firestore();
}

beforeEach(async ()=> {
    await firebase.clearFirestoreData({projectId: EPS_ID});
});

describe("Security rules", ()=> {

    it("Can read items in the read-only colleciton", async ()=> {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get()); 
    });
    it("Can write items in the read-only colleciton", async ()=> {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc2");
        await firebase.assertFails(testDoc.set({foo:"bar"}));
        
    });
    it("Can write document with same ID as our user", async ()=> {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("users").doc(myId);
        await firebase.assertSucceeds(testDoc.set({foo:"bar"}));
        
    });
    it("Can write document with different ID as our user", async ()=> {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("users").doc(theirId);
        await firebase.assertFails(testDoc.set({foo:"bar"}));
        
    });
    it("Can read posts marked public", async ()=> {
        const db = getFirestore(null);
        const testQuery = db.collection("posts").where("visibility", "==", "public");
        await firebase.assertSucceeds(testQuery.get());
        
    })
    it("Can query personal posts", async ()=> {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("posts").where("authorId", "==", myId);
        await firebase.assertSucceeds(testQuery.get());
        
    });
    it("Can't query all posts", async ()=> {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("posts");
        await firebase.assertFails(testQuery.get());  
    });
    it("Can read a single public post", async ()=> {
        const admin = getAdminFirestore();
        const postId = "public_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, visibility: "public"});

        const db = getFirestore(null);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testRead.get());
    });
    it("Can read a single private post belonging to the user", async ()=> {
        const admin = getAdminFirestore();
        const postId = "private_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: myId, visibility: "private"});

        const db = getFirestore(myAuth);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testRead.get());
    });
    it("Can't read a private post belonging to anthoer user", async ()=> {
        const admin = getAdminFirestore();
        const postId = "private_post";
        const setupDoc = admin.collection("posts").doc(postId);
        await setupDoc.set({authorId: theirId, visibility: "private"});

        const db = getFirestore(myAuth);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertFails(testRead.get());
    });
    it("Allows a user to edit thier own post", async ()=> {
        const postId = "post_123";
        const admin = getAdminFirestore();
        await admin.collection("posts").doc(postId).set({content:"before", authorId:myId});

        const db = getFirestore(myAuth);
        const testDoc = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testDoc.update({content:"after"}));
    });
    it("Doesn't allows a user to edit somebody else's post", async ()=> {
        const postId = "post_123";
        const admin = getAdminFirestore();
        await admin.collection("posts").doc(postId).set({content:"before", authorId:theirId});

        const db = getFirestore(myAuth);
        const testDoc = db.collection("posts").doc(postId);
        await firebase.assertFails(testDoc.update({content:"after"}));
    });
    it("Allows a user to create a post when they list themselves as author", async ()=> {
        const postPath = "posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertSucceeds(testDoc.set({authorId:myId, content:"content",visibility:"public", 
        headline:"headline"}));
    });
    it("Doesn't Allows a user to create a post when they list themselves as author", async ()=> {
        const postPath = "posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertFails(testDoc.set({authorId:theirId, content:"content",visibility:"public",
        headline:"headline"}));
    });
    it("Can create a post with all required field", async ()=> {
        const postPath = "posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertSucceeds(testDoc.set({authorId:myId, content:"content", 
        visibility:"public", headline:"headline"}));
    });
    it("Can't create a post with missing some riquered fields", async ()=> {
        const postPath = "posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertFails(testDoc.set({authorId:myId, content:"content", visibility:"public"}));
    });
    it("Can't create a post with an unnapproved fields", async ()=> {
        const postPath = "posts/post_123";
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertFails(testDoc.set({authorId:myId, content:"content", visibility:"public", not_allowd:true}));
    });
    /*
    it("can edit a post with allowd fields", async()=> {
        const postPath = "posts/post_123";
        const admin = getAdminFirestore();
        await admin.doc(postPath).set({content: "before_content", authorId: myId,
        headline: "headline", visibility: "public"});
        
        const db = getFirestore(myAuth);
        const testDoc = db.doc(postPath);
        await firebase.assertSucceeds(testDoc.update({content:"after_content"}));
    });
    */
});

after(async ()=> {
    await firebase.clearFirestoreData({projectId: EPS_ID});
});