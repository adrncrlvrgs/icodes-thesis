import React from 'react';
import Body from '../../../sections/maintenance/Body';
import { Text } from '@chakra-ui/react';

const Item = () => {
	return <Text>Home</Text>;
};

function AdHome() {
	return <Body children={<Item />} />;
}

export default AdHome;
