import React from 'react';
import { RxUpload } from 'react-icons/rx';
import '../styles/FileStyles.css';

import { FormControl, Flex, Center } from '@chakra-ui/react';
function CusUpload({ onChange, fileName, name, id, onBlur, error, touch }) {
	return (
		<FormControl isInvalid={error && touch}>
			<div className='parent'>
				<div className='file-upload'>
					<Center>
						<RxUpload />
					</Center>

					<h3>{fileName}</h3>
					<p>Maximum file size is 10MB.</p>
					<input
						id={id}
						name={name}
						type='file'
						onChange={onChange}
						onBlur={onBlur}
					/>
				</div>
			</div>
			<Flex
				fontSize={'xs'}
				color='red.500'
			>
				{error}
			</Flex>
		</FormControl>
	);
}

export default CusUpload;
