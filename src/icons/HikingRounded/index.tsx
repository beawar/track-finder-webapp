import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import { ReactComponent as HikingRounded } from './hiking-24dp.svg';

const HikingRoundedIcon: React.FC<SvgIconProps> = (props) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<SvgIcon {...props} component={HikingRounded} />
	);
};

export default HikingRoundedIcon;
