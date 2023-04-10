import React from 'react';
import { Td } from '@chakra-ui/react';

export const CusTD = ({ component }) => {
	return (
		<Td
			color={'b.300'}
			fontSize='xs'
			fontWeight='normal'
		>
			{component}
		</Td>
	);
};

export const CusTitle = ({ component }) => {
	return (
		<Td
			display={{
				base: 'table-cell',
				md: 'none',
			}}
			sx={{
				'@media print': {
					display: 'none',
				},
				textTransform: 'uppercase',
				color: 'b.300',
				fontSize: 'xs',
				fontWeight: 'bold',
				letterSpacing: 'wider',
				fontFamily: 'heading',
			}}
		>
			{component}
		</Td>
	);
};
