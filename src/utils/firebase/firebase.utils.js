
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
} from "firebase/auth";
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    getDocs,
    addDoc,
    collection, 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAiLk1RgtS30fCXyIXjnf81hwsZ9wCgSU",
  authDomain: "cloud-apparel-db.firebaseapp.com",
  projectId: "cloud-apparel-db",
  storageBucket: "cloud-apparel-db.firebasestorage.app",
  messagingSenderId: "510199093306",
  appId: "1:510199093306:web:f118d842b9b94b1b667d03"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore(firebaseApp);


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log('user doc ref: ', userDocRef);
    const userSnapshot = await getDoc(userDocRef)
    console.log('user snapshot: ', userSnapshot);
    console.log('user snapshot exists?: ', userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('failed to set doc', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}