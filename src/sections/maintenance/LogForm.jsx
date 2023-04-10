import {
	Box,
	Stack,
	Heading,
	Text,
	Container,
	SimpleGrid,
	Button,
	Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CusInputFloat } from '../../customs/CusInput';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../AuthContext.js';

const Blur = (props) => {
	return (
		<Image
			zIndex={-4}
			alt={'Login Image'}
			objectFit={'cover'}
			w={'100%'}
			h={'100%'}
			src={require('../../assets/imgs/login-bg.jpg')}
			{...props}
		></Image>
	);
};

function LogForm() {
	const [setLoading] = useState(false);

	const { login } = useAuth();

	const form = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Username is required.'),
			password: Yup.string().required('Password is required.'),
		}),
		onSubmit: (values, actions) => {
			actions.resetForm();
			console.log(values.email);

			try {
				setLoading(true);
				login(values.email, values.password);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		},
	});
	return (
		<Box>
			<Container
				as={SimpleGrid}
				maxW={'7xl'}
				columns={{ base: 1, md: 2 }}
				spacing={{ base: 10, lg: 32 }}
				py={{ base: 10, sm: 20, lg: 32 }}
				maxH={'88.45vh'}
			>
				<Stack spacing={{ base: 10, md: 20 }}>
					<Heading
						lineHeight={1.1}
						fontSize={{
							base: '3xl',
							sm: '4xl',
							md: '5xl',
							lg: '6xl',
						}}
						mt={8}
					>
						Congressional Town Center Admin{' '}
						<Text
							as={'span'}
							bgGradient='linear(to-r, blue.700,b.300)'
							bgClip='text'
						>
							&
						</Text>{' '}
						Staffs.
					</Heading>
				</Stack>
				<Stack
					bg={'gray.50'}
					rounded={'xl'}
					p={{ base: 4, sm: 6, md: 8 }}
					spacing={{ base: 8 }}
					maxW={{ lg: 'lg' }}
				>
					<Stack spacing={4}>
						<Heading
							color={'gray.800'}
							lineHeight={1.1}
							fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
						>
							Login to your account
							<Text
								as={'span'}
								bgGradient='linear(to-r, b.200,b.300)'
								bgClip='text'
							>
								.
							</Text>
						</Heading>
						<Text
							color={'gray.500'}
							fontSize={{ base: 'sm', sm: 'md' }}
						>
							Access, supervise, and manage your day-to-day
							condominium activities.
						</Text>
					</Stack>
					<form
						onSubmit={form.handleSubmit}
						mt={10}
					>
						<Stack spacing={7}>
							<CusInputFloat
								variant='floating'
								label={'Enter Username'}
								id={'email'}
								isRequired
								name={'email'}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.email}
								error={form.errors.email}
								touch={form.touched.email}
							/>

							<CusInputFloat
								name={'password'}
								variant='floating'
								label={'Enter Password'}
								id={'password'}
								type={'password'}
								isRequired
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.password}
								touch={form.touched.password}
								value={form.values.password}
							/>
						</Stack>

						<Stack spacing={3}>
							<Button
								variant={'tertiary'}
								size={'xs'}
								w={'100%'}
								mt={3}
							>
								Forgot Password?
							</Button>

							<Button
								fontFamily={'heading'}
								w={'100%'}
								variant={'primary'}
								type='submit'
							>
								Submit
							</Button>
						</Stack>
					</form>
				</Stack>
			</Container>
			<Blur
				position={'absolute'}
				top={'-5px'}
				style={{ filter: 'blur(10px) ' }}
			/>
		</Box>
	);
}

export default LogForm;
