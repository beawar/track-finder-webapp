/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from 'formik';
import debounce from 'lodash/debounce';

export type InputTextProps = TextFieldProps & {
	name: string;
	errorMsg?: string;
};

export const InputText: React.VFC<InputTextProps> = ({ name, errorMsg, ...props }) => {
	const [field, meta, { setValue }] = useField(name);
	const [innerValue, setInnerValue] = useState<unknown>(props.value || field.value || '');

	useEffect(() => {
		setInnerValue(field.value ?? '');
	}, [field.value]);

	const setValueDebounced = useCallback(
		debounce((event) => {
			setValue(event.target.value);
		}, 500),
		[setValue]
	);

	const onChangeHandler = useCallback(
		(event) => {
			setInnerValue(event.target.value);
			setValueDebounced(event);
			if (props.onChange) {
				props.onChange(event);
			}
		},
		[props, setValueDebounced]
	);

	const onBlurHandler = useCallback(
		(event) => {
			field.onBlur(event);
			if (props.onBlur) {
				props.onBlur(event);
			}
		},
		[field, props]
	);

	return (
		<TextField
			id={name}
			name={name}
			variant="filled"
			error={meta.touched && (Boolean(meta.error) || Boolean(errorMsg))}
			helperText={(meta.touched && (meta.error || errorMsg)) || ' '}
			margin="normal"
			{...props}
			value={innerValue}
			onChange={onChangeHandler}
			onBlur={onBlurHandler}
		/>
	);
};
