import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';

function CusModal({ header, component, action, onClose, onOpen, isOpen }) {
	return (
		<>
			<Button
				onClick={onOpen}
				variant={'primary'}
				boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
			>
				{action}
			</Button>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent maxW='40%'>
					<ModalHeader>{header}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={5}>{component}</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CusModal;
