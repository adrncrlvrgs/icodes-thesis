import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
	apiKey: 'AIzaSyAQOk3qcOzuEHCcjJzIr7e67v2dN7QgFw8',
	authDomain: 'db-icodes-thesis.firebaseapp.com',
	projectId: 'db-icodes-thesis',
	storageBucket: 'db-icodes-thesis.appspot.com',
	messagingSenderId: '909723058588',
	appId: '1:909723058588:web:327efef65a96d54d6f0859',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
