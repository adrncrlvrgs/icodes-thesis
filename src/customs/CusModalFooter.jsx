import React from 'react';
import { Button } from '@chakra-ui/react';

const CusModalFooter = ({ onClose, form, actionLabel }) => {
	return (
		<>
			<Button
				colorScheme='blue'
				mr={5}
				onClick={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				{actionLabel}
			</Button>
			<Button onClick={onClose}>Cancel</Button>
		</>
	);
};

export default CusModalFooter;
