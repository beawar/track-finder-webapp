import React from 'react';
import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

interface TitleProps {
	type: Variant;
}

export const Text: React.FC<TitleProps> = ({ type, children }) => {
	return <Typography variant={type}>{children}</Typography>;
};
