import React, { useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { db } from './firebase-config.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const auth = getAuth();
	const storage = getStorage();
	const toast = useToast();

	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const register = async (
		email,
		password,
		profile,
		lName,
		mName,
		fName,
		cNum,
		uName,
		empPos,
		empId,
		dStart,
		profileName
	) => {
		await createUserWithEmailAndPassword(auth, `${email}.com`, password)
			.then((userCredential) => {
				console.log(`${email}.com`);
				const user = userCredential.user;

				const storageRef = ref(
					storage,
					`images/employees/${user.uid}.jpg`
				);

				try {
					sendPasswordResetEmail(auth, `${email}.com`).then(() => {
						try {
							const uploadTask = uploadBytesResumable(
								storageRef,
								profile
							);

							uploadTask.on(
								'state_changed',
								(snapshot) => {
									const progress =
										(snapshot.bytesTransferred /
											snapshot.totalBytes) *
										100;

									switch (snapshot.state) {
										case 'paused':
											console.log('Upload is paused');
											break;
										case 'running':
											console.log('Upload is running');
											break;
									}
								},
								(error) => {
									console.log(error);
								},
								() => {
									getDownloadURL(
										uploadTask.snapshot.ref
									).then((downloadURL) => {
										const collectionRef = doc(
											db,
											'maintenance',
											'admin',
											'tbl_employees',
											user.uid
										);
										const docRef = setDoc(collectionRef, {
											lName: lName,
											mName: mName,
											fName: fName,
											cNum: cNum,
											uName: uName,
											empPos: empPos,
											empId: empId,
											dStart: dStart,
											createdDate: serverTimestamp(),
											image: downloadURL,
											email: email,
										});

										toast({
											title: 'New Employee Added!',
											description: `${fName}'s username is ${uName}. Kindly check email to change password. `,
											status: 'success',
											duration: 9000,
											isClosable: true,
										});
									});
								}
							);
						} catch (e) {
							console.log(e);
						}
					});
				} catch (e) {
					toast({
						title: 'Employee already exist!',
						status: 'error',
						duration: 9000,
						isClosable: true,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const login = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/AdHome');
		} catch (error) {
			toast({
				title: 'Invalid Email/Password',
				status: 'error',
				isClosable: true,
				position: 'top',
				duration: 3000,
			});
		}
	};

	const logout = async () => {
		return await signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
	// 		setCurrentUser(user);
	// 		const uid = user.uid;
	// 		// ...
	// 	} else {
	// 		// User is signed out
	// 		// ...
	// 	}
	// });
	const value = {
		currentUser,
		register,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
