import React from 'react';
import { InputText, InputTextProps } from './InputText';

export const InputNumber: React.VFC<InputTextProps> = ({ label, name, inputProps, InputProps }) => {
	return (
		<InputText
			label={label}
			name={name}
			inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', ...inputProps }}
			InputProps={InputProps}
			type="number"
		/>
	);
};
