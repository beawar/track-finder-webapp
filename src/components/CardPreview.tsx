import React, { useState } from 'react';
import { CardMedia } from '@material-ui/core';
import PreviewMountain from '../assets/mountain-hexagon.svg';

interface CardPreviewProps {
	url: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CardPreview = ({ url }: CardPreviewProps): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [thumbnail, setThumbnail] = useState<string>(PreviewMountain);

	return <CardMedia src={thumbnail} alt="track preview" component="img" />;
};
