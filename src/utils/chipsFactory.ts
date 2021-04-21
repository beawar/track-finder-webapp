import React from 'react';
import reduce from 'lodash/reduce';
import { amber, blue, lightGreen, red } from '@material-ui/core/colors';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import { SvgIconProps } from '@material-ui/core';
import { TransferWithinAStationRounded } from '@material-ui/icons';
import { formatTime, parseTime } from './utils';
import { Activity, Track } from '../types/graphql';
import HikingRoundedIcon from '../icons/HikingRounded';

const chipsFields: { [key: string]: keyof Track } = {
	distance: 'length',
	duration: 'time',
	altitude: 'altitudeDifference',
	activity: 'activity',
};

const labelParser = {
	[chipsFields.duration]: (time: unknown) => formatTime(parseTime(time as string)),
	[chipsFields.distance]: (distance: unknown) => `${distance} km`,
	[chipsFields.altitude]: (altitude: unknown) => `${altitude} m`,
	[chipsFields.activity]: (activity: unknown) => (activity as Activity).name,
};

const backgroundColors: { [key: string]: string } = {
	[chipsFields.duration]: lightGreen[700],
	[chipsFields.altitude]: amber[500],
	[chipsFields.distance]: blue[500],
	[chipsFields.activity]: red[700],
};

const icons: { [key: string]: React.FC<SvgIconProps> } = {
	[chipsFields.duration]: UpdateRoundedIcon,
	[chipsFields.altitude]: TrendingUpRoundedIcon,
	[chipsFields.distance]: TransferWithinAStationRounded,
	[chipsFields.activity]: HikingRoundedIcon,
};

interface ChipField {
	label: React.ReactNode;
	backgroundColor: string;
	icon: React.FC<SvgIconProps>;
	key: string;
}

export const chipFactory = (track: Track): ChipField[] => {
	return reduce(
		chipsFields,
		(accumulator: ChipField[], field) => {
			if (track[field]) {
				let label = track[field];
				if (labelParser[field]) {
					label = labelParser[field](label);
				}
				if (label) {
					accumulator.push({
						label,
						backgroundColor: backgroundColors[field],
						icon: icons[field],
						key: field,
					});
				}
			}
			return accumulator;
		},
		[]
	);
};
