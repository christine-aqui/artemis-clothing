import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const config = {
	apiKey: 'AIzaSyB05yE1upR8KqtqCNivia9W56-VFj46ADY',
	authDomain: 'artemis-db.firebaseapp.com',
	databaseURL: 'https://artemis-db.firebaseio.com',
	projectId: 'artemis-db',
	storageBucket: 'artemis-db.appspot.com',
	messagingSenderId: '1030280430244',
	appId: '1:1030280430244:web:df2afd0e912ae85005dc31',
	measurementId: 'G-F5JRKZ49P6'
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // trigger user selection
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
