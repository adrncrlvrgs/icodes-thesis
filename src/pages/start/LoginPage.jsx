import React from 'react';
import { Flex } from '@chakra-ui/react';
import LogForm from '../../sections/maintenance/LogForm';
import TopNav from '../../sections/navigation/TopNav';

function LoginPage() {
	return (
		<Flex flexDir={'column'}>
			<TopNav />
			<LogForm />
		</Flex>
	);
}

export default LoginPage;
