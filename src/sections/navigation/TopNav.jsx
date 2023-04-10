import {
	Button,
	Flex,
	HStack,
	useColorModeValue,
	useDisclosure,
	VisuallyHidden,
	IconButton,
	Box,
	VStack,
	chakra,
} from '@chakra-ui/react';
import { React } from 'react';
import { GoThreeBars } from 'react-icons/go';
import { RiCloseFill } from 'react-icons/ri';

import Logo from '../../styles/Logo';

function TopNav() {
	const bg = useColorModeValue('w.100', 'b.400');
	const mobNav = useDisclosure();

	return (
		<Flex>
			<chakra.header
				bg={bg}
				w='100%'
				px={{
					base: 2,
					sm: 4,
				}}
				py={4}
				shadow='md'
			>
				<Flex
					alignItems='center'
					justifyContent='space-between'
					mx='auto'
				>
					<Flex>
						<chakra.a
							href='/'
							title='ICODES'
							display='flex'
							alignItems='center'
						>
							<Logo />
							<VisuallyHidden>ICODES</VisuallyHidden>
						</chakra.a>
						{/* <chakra.h1
							fontSize='xl'
							fontWeight='medium'
							ml='2'
						>
							ICODES
						</chakra.h1> */}
					</Flex>
					<HStack
						display='flex'
						alignItems='center'
						spacing={1}
					>
						<HStack
							spacing={1}
							mr={1}
							color='brand.500'
							display={{
								base: 'none',
								md: 'inline-flex',
							}}
						>
							<Button
								variant={'tertiary'}
								size='sm'
							>
								Home
							</Button>
							<Button
								variant={'tertiary'}
								size='sm'
							>
								Finder
							</Button>
							<Button
								variant={'tertiary'}
								size='sm'
							>
								Designer
							</Button>
							<Button
								variant={'tertiary'}
								size='sm'
							>
								Calculator
							</Button>
						</HStack>
						<Button
							variant={'primary'}
							size='sm'
						>
							Login
						</Button>
						<Box
							display={{
								base: 'inline-flex',
								md: 'none',
							}}
						>
							<IconButton
								display={{
									base: 'flex',
									md: 'none',
								}}
								aria-label='Open menu'
								fontSize='20px'
								color='b.300'
								variant='none'
								onClick={mobNav.onOpen}
								icon={<GoThreeBars />}
							/>

							<VStack
								pos='absolute'
								top={0}
								left={0}
								right={0}
								display={mobNav.isOpen ? 'flex' : 'none'}
								flexDirection='column'
								p={2}
								pb={4}
								m={2}
								bg={bg}
								spacing={3}
								rounded='sm'
								shadow='sm'
							>
								<RiCloseFill
									aria-label='Close menu'
									onClick={mobNav.onClose}
									variant='none'
									icon={<RiCloseFill />}
								/>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Home
								</Button>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Finder
								</Button>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Designer
								</Button>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Calculator
								</Button>

								<Button
									variant={'tertiary'}
									size='sm'
								>
									Login
								</Button>
							</VStack>
						</Box>
					</HStack>
				</Flex>
			</chakra.header>
		</Flex>
	);
}

export default TopNav;
