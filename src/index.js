import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import CompStyles from './styles/CompStyles';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ChakraProvider theme={CompStyles}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
