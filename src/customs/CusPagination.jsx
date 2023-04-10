import React from 'react';
import {
	Container,
	Text,
	Flex,
	Icon,
	useColorModeValue,
} from '@chakra-ui/react';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function CusPagination({
	page,
	currentPage,
	setCurrentPage,
	firstIndex,
	lastIndex,
	numPage,
}) {
	return (
		<Container
			d='flex'
			maxWidth='7xl'
			w='full'
			h='218px'
			justify='space-between'
			alignItems='center'
			p={{ base: 5, sm: 10 }}
		>
			<Pagination
				page={page}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				firstIndex={firstIndex}
				lastIndex={lastIndex}
				numPage={numPage}
			/>
		</Container>
	);
}

const Pagination = ({ page, currentPage, setCurrentPage, numPage }) => {
	const prePage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	const changePage = (n) => {
		setCurrentPage(n);
	};
	const nextPage = () => {
		if (currentPage !== numPage) {
			setCurrentPage(currentPage + 1);
		}
	};
	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			justify='flex-end'
			alignItems='flex-end'
			w='full'
		>
			{/* <Text fontSize='lg'>
				Showing {page} to 30 of {} results
			</Text> */}
			<Flex
				as='nav'
				aria-label='Pagination'
				alignItems='center'
				mt={{ base: 3, md: 0 }}
			>
				<PaginationButton
					borderTopLeftRadius='md'
					borderBottomLeftRadius='md'
					onClick={prePage}
				>
					<Icon
						as={FaChevronLeft}
						w={3.5}
						h={3.5}
					/>
				</PaginationButton>

				{page.map((n, i) => (
					<PaginationButton
						key={i}
						bgColor={currentPage == n ? 'b.100' : '#w.100'}
						onClick={() => {
							changePage(n);
						}}
					>
						{n}
					</PaginationButton>
				))}

				<PaginationButton
					borderTopRightRadius='md'
					borderBottomRightRadius='md'
					onClick={nextPage}
				>
					<Icon
						as={FaChevronRight}
						w={3.5}
						h={3.5}
					/>
				</PaginationButton>
			</Flex>
		</Flex>
	);
};

const PaginationButton = ({ children, isDisabled, isActive, ...props }) => {
	const activeStyle = {
		bg: useColorModeValue('gray.300', 'gray.700'),
	};

	return (
		<Flex
			p={3}
			px={4}
			fontSize='md'
			fontWeight='500'
			lineHeight='1rem'
			height='2.5rem'
			opacity={isDisabled && 0.7}
			//	_hover={!isDisabled && activeStyle}
			cursor={isDisabled ? 'not-allowed' : 'pointer'}
			border='1px solid'
			mr='-1px'
			borderColor={useColorModeValue('gray.300', 'gray.700')}
			{...(isActive && activeStyle)}
			{...props}
		>
			{children}
		</Flex>
	);
};

export default CusPagination;
