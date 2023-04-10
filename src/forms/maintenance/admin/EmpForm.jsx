import React from 'react';
import {
	Stack,
	Avatar,
	AvatarBadge,
	IconButton,
	Center,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import {
	CusInputFloat,
	CusInputRegular,
	CusInputLeftAdd,
	CusInputRightAdd,
} from '../../../customs/CusInput';
import { CusSelectEmployees } from '../../../customs/CusSelect';
import CusModalFooter from '../../../customs/CusModalFooter';
import CusUpload from '../../../customs/CusUpload';

const EmpForm = ({
	onClose,
	form,
	setShowImage,
	showImage,
	setEmpPos,
	actionLabel,
}) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<Center>
							<Avatar
								size='xl'
								style={{
									display: showImage ? 'none' : 'block',
								}}
							></Avatar>
							{showImage && (
								<Avatar
									size='xl'
									src={showImage}
									border={'2px'}
									borderColor={'Highlight'}
								>
									<AvatarBadge
										as={IconButton}
										size='sm'
										rounded='full'
										top='-10px'
										colorScheme='red'
										aria-label='remove Image'
										icon={<MdClose />}
										onClick={(e) => {
											e.preventDefault();
											setShowImage(null);
											document.getElementById(
												'image'
											).value = '';
										}}
									/>
								</Avatar>
							)}
						</Center>
						<Center w='full'>
							<CusUpload
								name='image'
								id='image'
								onChange={(e) => {
									const file = e.target.files[0];
									form.setFieldValue('image', file);
									setShowImage(URL.createObjectURL(file));
								}}
								fileName={
									showImage
										? 'Image Chosen'
										: "Click to Upload Employee's Image"
								}
								onBlur={form.handleBlur}
								error={form.errors.image}
								touched={form.touched.image}
							/>
						</Center>
					</Stack>

					<Stack
						spacing={6}
						pt={4}
						direction={['column', 'row']}
					>
						<CusInputFloat
							name='lName'
							variant='floating'
							label={'Last Name'}
							id={'lName'}
							isRequired
							value={form.values.lName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.lName}
							touch={form.touched.lName}
						/>
						<CusInputFloat
							name='fName'
							variant='floating'
							label={'First Name'}
							id={'fName'}
							isRequired
							value={form.values.fName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.fName}
							touch={form.touched.fName}
						/>
						<CusInputFloat
							name='mName'
							variant='floating'
							label={'Middle Name'}
							id={'mName'}
							value={form.values.mName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						/>
					</Stack>

					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusInputLeftAdd
							name='cNum'
							label={'Contact Number'}
							id={'cNum'}
							type={'tel'}
							add={'+639'}
							placeholder={'XXXXXXXXX'}
							isRequired
							value={form.values.cNum}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.cNum}
							touch={form.touched.cNum}
						/>

						<CusInputRightAdd
							name='email'
							label={'Email'}
							id={'email'}
							type={'email'}
							add={'.com'}
							placeholder={'XXXXXXXXXX@XXXXX'}
							isRequired
							value={form.values.email}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.email}
							touch={form.touched.email}
						/>
					</Stack>

					<Stack
						direction={['column', 'row']}
						spacing={6}
						pb={6}
					>
						<CusSelectEmployees
							name='empPos'
							isRequired
							id={'empPos'}
							label={'Position'}
							onChange={(e) => {
								form.setFieldValue('empPos', e.target.value);
								setEmpPos(e.target.value);
							}}
							onBlur={form.handleBlur}
							error={form.errors.empPos}
							touch={form.touched.empPos}
						/>
						<CusInputRegular
							name='empId'
							label={'Employee ID'}
							id={'empId'}
							type={'empId'}
							placeholder={'XXXXXX'}
							isRequired
							value={form.values.empId}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.empId}
							touch={form.touched.empId}
						/>
						<CusInputRegular
							name='dStart'
							label={'Start Date'}
							id={'dStart'}
							type={'date'}
							isRequired
							value={form.values.dStart}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.dStart}
							touch={form.touched.dStart}
						/>
					</Stack>

					<Stack
						direction={['column', 'row']}
						justify={'flex-end'}
					>
						<CusModalFooter
							onClose={onClose}
							form={form}
							actionLabel={actionLabel}
						/>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
};

export default EmpForm;
