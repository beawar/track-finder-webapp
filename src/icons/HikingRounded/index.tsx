import { SvgIcon, SvgIconProps } from '@material-ui/core';
import { ReactComponent as HikingRounded } from './hiking-24dp.svg';

const HikingRoundedIcon = (props: SvgIconProps): JSX.Element => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<SvgIcon {...props}>
			<HikingRounded />
		</SvgIcon>
	);
};

export default HikingRoundedIcon;
