import React from 'react';
import { Text } from '@chakra-ui/react';
import { Route, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoutes = ({ children }) => {
	const { currentUser } = useAuth;

	return currentUser ? { children } : <Link to='/' />;
};

export default PrivateRoutes;
