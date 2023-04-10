import React from 'react';
import { Td, Tr, Image, ButtonGroup } from '@chakra-ui/react';
import { CusTD, CusTitle } from '../../../customs/CusTableItems';
import CusDelete from '../../../customs/CusDelete';
import DateChecker from '../../../utilities/DateChecker';
import FNameFormat from '../../../utilities/FNameFormat';
import EditEmployee from '../../../modals/maintenance/admin/EditEmployee';

const EmployeeTable = ({ data, search, all }) => {
	const ret = search ? all : data;
	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.empId.toLowerCase().includes(search);
		})
		.map((data, tid) => {
			const date = data.createdDate
				? data.createdDate.seconds * 1000
				: '';

			const fName = data.fName ? data.fName : '';
			const mName = data.mName ? data.mName : '';
			const lName = data.lName ? data.lName : '';

			return (
				<Tr
					key={tid}
					display={{
						base: 'grid',
						md: 'table-row',
					}}
					sx={{
						'@media print': {
							display: 'table-row',
						},
						gridTemplateColumns:
							'minmax(0px, 35%) minmax(0px, 65%)',
						gridGap: '10px',
					}}
				>
					<React.Fragment key={`${tid}`}>
						<CusTitle component={'Created At'} />
						<CusTD
							component={
								<DateChecker dateToCheck={new Date(date)} />
							}
						/>
						<CusTitle component={'Image'} />
						<CusTD
							component={
								<Image
									src={data.image}
									w='45px'
								/>
							}
						/>
						<CusTitle component={'Employee ID'} />
						<CusTD component={data.empId} />
						<CusTitle component={'Name'} />
						<CusTD
							component={
								<FNameFormat
									fName={fName}
									mName={mName}
									lName={lName}
								/>
							}
						/>
						<CusTitle component={'Contact Number'} />
						<CusTD
							component={data.cNum ? '+639' + data.cNum : ''}
						/>
						<CusTitle component={'Email'} />
						<CusTD
							component={data.email ? data.email + '.com' : ''}
						/>
						<CusTitle component={'Position'} />
						<CusTD component={data.empPos} />
						<CusTitle component={'Employment Start'} />
						<CusTD component={data.dStart} />
						<CusTitle component={'Status'} />
						<CusTD component={data.email ? 'Active' : ''} />
					</React.Fragment>

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
							//color: color2,
							fontSize: 'xs',
							fontWeight: 'bold',
							letterSpacing: 'wider',
							fontFamily: 'heading',
						}}
					>
						Actions
					</Td>
					<Td>
						<ButtonGroup
							variant='solid'
							size='sm'
							spacing={3}
						>
							{data.id ? (
								<EditEmployee
									data={data}
									id={data.id}
									mainCollection='maintenance'
									tblDocUser='admin'
									tblUserCol='tbl_employees'
								/>
							) : (
								''
							)}
							<CusDelete
								id={data.id}
								label={` ${data.fName}'s Data`}
								mainCollection='maintenance'
								tblDocUser='admin'
								tblUserCol='tbl_employees'
							/>
						</ButtonGroup>
					</Td>
				</Tr>
			);
		});
};

export default EmployeeTable;
