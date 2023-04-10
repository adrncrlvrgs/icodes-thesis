import React, { useEffect, useState } from 'react';
import { Flex, Text, Heading } from '@chakra-ui/react';

import AddEmployee from '../../../modals/maintenance/admin/AddEmployee';
import Body from '../../../sections/maintenance/Body';
import CusTable from '../../../customs/CusTable';
import CusPagination from '../../../customs/CusPagination';
import CusSearch from '../../../customs/CusSearch';
import EmployeeTable from '../../../tables/maintenance/admin/EmployeeTable';

import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase-config';

const Item = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [employees, setEmployees] = useState([{}]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_employees')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const employees = [];
			querySnapshot.forEach(
				(doc) => {
					employees.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setEmployees(employees);
		});
		return () => unsubscribe();
	}, []);

	const header = [
		'Created At',
		'Image',
		'Employee ID',
		'Name',
		'Contact Number',
		'Email',
		'Position',
		'Employment Start',
		'Status',
		'Modify',
	];

	const records = employees.slice(firstIndex, lastIndex);
	const numPage = Math.ceil(employees.length / recordsPerPage);
	const pages = [...Array(numPage + 1).keys()].slice(1);

	return (
		<Flex
			flexDir='column'
			p={'50px'}
		>
			<Heading
				fontSize='md'
				color={'b.300'}
			>
				Hi, Admin!
			</Heading>
			<Text color={'b.300'}>Manage the employees here.</Text>
			<Flex
				display='flex'
				justifyContent='flex-end'
				mb={5}
				gap={5}
			>
				<CusSearch
					placeholder={'Search by ID'}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<AddEmployee />
			</Flex>

			<CusTable
				header={header}
				children={
					<EmployeeTable
						data={records}
						search={search}
						all={employees}
					/>
				}
			/>

			<CusPagination
				page={pages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				lastIndex={lastIndex}
				firstIndex={firstIndex}
				numPage={numPage}
			/>
		</Flex>
	);
};

function Employees() {
	return <Body children={<Item />} />;
}

export default Employees;
