import React from 'react';
import { Flex, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

const CusTable = ({ header, children }) => {
	return (
		<Flex
			w='100%'
			alignItems='center'
			justifyContent='center'
			// h={'50vh'}
		>
			<Table
				boxShadow='0 4px 10px 0 rgba(134,149,166,0.7)'
				w='100%'
				bg='b.100'
				variant='striped'
				display={{
					base: 'block',
					md: 'table',
				}}
				sx={{
					'@media print': {
						display: 'table',
					},
				}}
			>
				<Thead
					display={{
						base: 'none',
						md: 'table-header-group',
					}}
					sx={{
						'@media print': {
							display: 'table-header-group',
						},
					}}
					alignSelf='center'
				>
					<Tr>
						{header.map((x) => (
							<Th key={x}>{x}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody
					display={{
						base: 'block',
						lg: 'table-row-group',
					}}
					sx={{
						'@media print': {
							display: 'table-row-group',
						},
					}}
				>
					{children}
				</Tbody>
			</Table>
		</Flex>
	);
};

export default CusTable;
