/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import { Autocomplete, AutocompleteProps } from '@material-ui/core';
import { useField } from 'formik';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import { InputText } from './InputText';

export interface SelectionOption<T> {
	value: T;
	label: string;
}

interface InputSelectionProps
	extends Omit<
		AutocompleteProps<SelectionOption<unknown>, boolean, boolean, boolean>,
		'renderInput'
	> {
	label: string;
	name: string;
}

export const InputSelection: React.VFC<InputSelectionProps> = ({
	label,
	name,
	freeSolo = false,
	options,
}) => {
	const [field, meta, { setValue }] = useField(name);

	const onChangeHandler = useCallback(
		(_event, value) => {
			if (typeof value === 'string' && freeSolo) {
				// string added with enter
				setValue({ label: value, value });
			} else if (value?.inputValue) {
				// string added with "add" option
				setValue({ label: value.inputValue, value: value.value });
			} else {
				setValue(value);
			}
		},
		[freeSolo, setValue]
	);

	const getOptionLabelHandler = useCallback((option) => {
		// Value selected with enter, right from the input
		if (typeof option === 'string') {
			return option;
		}
		return option.label;
	}, []);

	const getOptionSelectedHandler = useCallback((option, value) => {
		if (value) {
			if (typeof value === 'string') {
				if (option.inputValue) {
					return option.inputValue.toLowerCase() === value.toLowerCase();
				}
				return option.label?.toLowerCase() === value.toLowerCase();
			}
			return isEqual(option.value, value.value);
		}
		return false;
	}, []);

	const selectionOptions = useMemo(() => {
		if (field.value) {
			const value = typeof field.value === 'string' ? field.value : field.value.label;
			const exists = find(options, (opt) => opt.label.toLowerCase() === value.toLowerCase());
			if (!exists && freeSolo) {
				if (typeof field.value === 'string') {
					return [
						...options,
						{
							inputValue: field.value,
							value: field.value,
							label: `Add "${field.value}"`,
						},
					];
				}
				return [...options, field.value];
			}
		}
		return options;
	}, [field.value, options, freeSolo]);

	return (
		<Autocomplete
			id={`${name}-autocomplete`}
			value={field.value || null}
			onChange={onChangeHandler}
			onBlur={field.onBlur}
			freeSolo={freeSolo}
			options={selectionOptions}
			getOptionLabel={getOptionLabelHandler}
			getOptionSelected={getOptionSelectedHandler}
			renderInput={(params) => <InputText {...params} label={label} name={name} fullWidth />}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
		/>
	);
};
