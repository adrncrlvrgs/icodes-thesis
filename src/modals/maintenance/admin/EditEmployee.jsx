import React, { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import EmpForm from '../../../forms/maintenance/admin/EmpForm';
import CusEdit from '../../../customs/CusEdit';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

function EditEmployee({ data, id, mainCollection, tblDocUser, tblUserCol }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [showImage, setShowImage] = useState(data.image);
	const [empPos, setEmpPos] = useState('');

	const toast = useToast();
	let posCode = '';

	switch (empPos) {
		case 'Admin':
			posCode = 'AD';
			break;
		case 'Property Management':
			posCode = 'PM';
			break;
		case 'Front Desk':
			posCode = 'FD';
			break;
		case 'Sales Management':
			posCode = 'SM';
			break;
		case 'Agent':
			posCode = 'AG';
			break;
		case 'Accounting Management':
			posCode = 'AM';
			break;
		default:
			posCode = '';
			break;
	}

	const editForm = useFormik({
		initialValues: {
			lName: data.lName,
			fName: data.fName,
			mName: data.mName,
			cNum: data.cNum,
			email: data.email,
			empId: data.empId,
			empPos: data.empPos,
			dStart: data.dStart,
			image: data.image,
		},
		validationSchema: Yup.object({
			// image: Yup.mixed().test(
			// 	'FILE_TYPE',
			// 	'Invalid File Type.',
			// 	(value) =>
			// 		value  &&
			// 		['image/png', 'image/jpeg', 'image/jpg'].includes(
			// 			value.type
			// 		)
			// ),

			cNum: Yup.string().matches(/^[0-9]{9}$/, 'Invalid Contact Number.'),
			email: Yup.string().matches(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
				'Invalid Email.'
			),
		}),
		onSubmit: async (value, actions) => {
			const email = value.email;
			const profile = value.image;
			// const profileName = showImage.name;
			const lName = value.lName;
			const mName = value.mName;
			const fName = value.fName;
			const cNum = value.cNum;
			const empId = value.empId;
			const dStart = value.dStart;
			const uName = posCode + '_' + empId;
			const storage = getStorage();
			const storageRef = ref(storage, `images/employees/${id}.jpg`);
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);

			try {
				updateDoc(docRef, {
					editedDate: serverTimestamp(),
					email: email,
					lName: lName,
					mName: mName,
					fName: fName,
					cNum: cNum,
					empId: empId,
					dStart: dStart,
					uName: uName,
				});

				toast({
					title: `${data.fName}'s Details Edited!`,
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Edited failed!',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				console.log(e);
			}

			if (data.image !== profile) {
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
								default:
									console.log('Uploaded');
							}
						},
						(error) => {
							console.log(error);
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								(downloadURL) => {
									try {
										updateDoc(docRef, {
											image: downloadURL,
										});
									} catch (e) {
										toast({
											title: 'Edited failed!',
											status: 'error',
											duration: 9000,
											isClosable: true,
										});
										console.log(e);
									}
								}
							);
						}
					);
				} catch (e) {
					console.log(e);
				}
			}

			actions.resetForm();
			onClose();
		},
	});

	return (
		<CusEdit
			header={`Edit ${data.fName}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<EmpForm
					onClose={onClose}
					form={editForm}
					setShowImage={setShowImage}
					showImage={showImage}
					setEmpPos={setEmpPos}
					actionLabel={'Edit'}
				/>
			}
		/>
	);
}

export default EditEmployee;
