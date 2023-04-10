import React from 'react';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
} from '@chakra-ui/react';

export const CusSelectEmployees = ({
	label,
	name,
	onChange,
	value,
	placeholder,
	error,
	onBlur,
	touch,
	isRequired,
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={'filled'}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				fontSize={'xs'}
				defaultValue={'Select'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				<option value='Admin'>Admin</option>
				<option value='Property Management'>Property Management</option>
				<option value='Front Desk'>Front Desk</option>
				<option value='Accounting Management'>
					Accounting Management
				</option>
				<option value='Sales Management'>Sales Management</option>
				<option value='Agent'>Agent</option>
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};
