import styled from '@emotion/styled';
import { Chip, ChipProps } from '@material-ui/core';

interface CustomChipProps {
	backgroundColor: string;
}

export const CustomChip = styled(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	({ backgroundColor, ...other }: CustomChipProps & Omit<ChipProps, keyof CustomChipProps>) => (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Chip {...other} />
	)
)`
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: white;
	font-weight: bold;
	border-radius: 1rem;
`;
