import React, { useEffect } from 'react';
import { useField } from 'formik';
import { InputText } from './InputText';
import { formatLinkDisplayName } from '../../utils/utils';

export type InputLinkProps = {
	name: string;
	urlLabel: string;
	labelLabel: string;
};

export const InputLink = ({ name, urlLabel, labelLabel }: InputLinkProps): JSX.Element => {
	const [urlField] = useField(`${name}.url`);
	const [labelField, _labelMeta, labelHelpers] = useField(`${name}.label`);

	useEffect(() => {
		if (urlField.value) {
			if (!labelField.value) {
				labelHelpers.setValue(formatLinkDisplayName(urlField.value));
			}
		}
	}, [labelField.value, labelHelpers, urlField.value]);

	return (
		<>
			<InputText type="url" label={urlLabel} name={`${name}.url`} fullWidth />
			<InputText label={labelLabel} name={`${name}.label`} fullWidth value={labelField.value} />
		</>
	);
};
