import React, { useState } from 'react';
import CusModal from '../../../customs/CusModal';
import { useDisclosure, Flex } from '@chakra-ui/react';
import EmpForm from '../../../forms/maintenance/admin/EmpForm';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import PasswordGenerator from '../../../utilities/PasswordGenerator';
import { useAuth } from '../../../AuthContext';

function AddEmployee() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [showImage, setShowImage] = useState('');

	const [empPos, setEmpPos] = useState('');
	const [loading, setLoading] = useState(false);

	const pass = PasswordGenerator(6);
	const navigate = useNavigate();
	const { register } = useAuth();

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
	}

	const form = useFormik({
		initialValues: {
			lName: '',
			fName: '',
			mName: '',
			cNum: '',
			email: '',
			empId: '',
			empPos: '',
			dStart: '',
			image: '',
		},
		validationSchema: Yup.object({
			image: Yup.mixed()
				.required("Employee's Image is required.")
				.test(
					'FILE_SIZE',
					'File size is too big.',
					(value) => value && value.size < 1024 * 1024
				)
				.test(
					'FILE_TYPE',
					'Invalid File Type.',
					(value) =>
						value &&
						['image/png', 'image/jpeg', 'image/jpg'].includes(
							value.type
						)
				),
			lName: Yup.string().required('Last Name is required.'),
			fName: Yup.string().required('First Name is required.'),
			cNum: Yup.string()
				.required('Contact Number is required.')
				.matches(/^[0-9]{9}$/, 'Invalid Contact Number.'),
			email: Yup.string()
				.required('Email is required.')
				.matches(
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
					'Invalid Email.'
				),
			empPos: Yup.string().required('Position is required.'),
			empId: Yup.string().required('Employee ID is required.'),
			dStart: Yup.string().required('Date Start is required.'),
		}),
		onSubmit: (value, actions) => {
			const password = pass;
			const email = value.email;
			const profile = value.image;
			const profileName = showImage.name;
			const lName = value.lName;
			const mName = value.mName;
			const fName = value.fName;
			const cNum = value.cNum;
			const empId = value.empId;
			const dStart = value.dStart;
			const uName = posCode + '_' + empId;

			actions.resetForm();
			onClose();

			try {
				setLoading(true);
				register(
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
				);
				navigate('/Employees');
			} catch (error) {
				console.log('failed');
				console.log(error);
			}
			setLoading(false);
		},
	});

	return (
		<Flex>
			<CusModal
				header={'Fill the employee details.'}
				component={
					<EmpForm
						onClose={onClose}
						form={form}
						setShowImage={setShowImage}
						showImage={showImage}
						setEmpPos={setEmpPos}
						actionLabel={'Save'}
					/>
				}
				action={'+ Add Employee'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
			/>
		</Flex>
	);
}

export default AddEmployee;
