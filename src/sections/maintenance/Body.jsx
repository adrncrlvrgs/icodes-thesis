import React from 'react';
import {
	Box,
	Drawer,
	DrawerContent,
	useDisclosure,
	Flex,
} from '@chakra-ui/react';

import { SidebarContent } from '../navigation/SideNav';

import { Header } from './Header';
function Body({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Flex
			bg='w.300'
			flexDir={'row'}
		>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>

			<Flex
				flexDir={'column'}
				w='100%'
			>
				<Header onOpen={onOpen} />

				<Box
					w={'100%'}
					bg={'#EFF3F6'}
				>
					{children}
				</Box>
			</Flex>
		</Flex>
	);
}
export default Body;
