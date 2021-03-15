import React from 'react';
import { Slide, useScrollTrigger } from '@material-ui/core';

interface HideOnScrollProps {
	children: React.ReactElement;
}

export const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
	const trigger = useScrollTrigger();
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};
