import React, { useState } from 'react';
import {
	IconButton,
	Avatar,
	Box,
	Flex,
	HStack,
	VStack,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import FNameFormat from '../../utilities/FNameFormat';
import Logo from '../../styles/Logo';

export const Header = ({ onOpen, ...rest }) => {
	const { currentUser, logout } = useAuth();

	const [name, setName] = useState();
	const [position, setPosition] = useState();
	const [image, setImage] = useState();

	getDocs(collection(db, 'maintenance', 'admin', 'tbl_employees')).then(
		(querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if (doc.id === currentUser.uid) {
					const data = doc.data();

					setName(
						<FNameFormat
							fName={data.fName}
							mName={data.mName}
							lName={data.lName}
						/>
					);
					setPosition(data.empPos);
					setImage(data.image);
				}
			});
		}
	);

	const navigate = useNavigate();
	function handleLogout() {
		try {
			logout();
			navigate('/Login');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Flex
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			borderBottomWidth='1px'
			borderBottomColor={'w.200'}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Box display={{ base: 'flex', md: 'none' }}>
				<Logo w={'50px'} />
			</Box>

			<HStack
				spacing={{ base: '0', md: '6' }}
				mr={5}
			>
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition='all 0.3s'
							_focus={{ boxShadow: 'none' }}
						>
							<HStack>
								<Avatar
									size={'sm'}
									src={image}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									pr={10}
								>
									<Text fontSize='sm'>{name}</Text>
									<Text
										fontSize='xs'
										color='gray.600'
									>
										{position}
									</Text>
								</VStack>

								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={handleLogout}
								fontSize={'sm'}
								_focus={{ boxShadow: 'none', bg: 'none' }}
								_hover={{ bg: 'w.100' }}
							>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
