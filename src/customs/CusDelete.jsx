import React, { useRef } from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	AlertDialogCloseButton,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react';
import { BsFillTrashFill } from 'react-icons/bs';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

function CusDelete({ id, label, mainCollection, tblDocUser, tblUserCol }) {
	const cancelRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onDeleteClick = async () => {
		try {
			await deleteDoc(
				doc(db, mainCollection, tblDocUser, tblUserCol, id)
			);
			onClose();
			console.log('deleted');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<IconButton
				onClick={onOpen}
				colorScheme='red'
				variant='outline'
				icon={<BsFillTrashFill />}
				aria-label='Delete'
			/>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize='lg'
							fontWeight='bold'
						>
							Delete {label}?
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								colorScheme='red'
								onClick={onDeleteClick}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default CusDelete;
