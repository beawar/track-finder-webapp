import { Chip, ChipProps, styled } from '@material-ui/core';

interface CustomChipProps {
	backgroundColor: string;
}

export const CustomChip = styled(
	({ backgroundColor, ...other }: CustomChipProps & Omit<ChipProps, keyof CustomChipProps>) => (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Chip {...other} />
	),
)({
	backgroundColor: (props: CustomChipProps) => props.backgroundColor,
	color: 'white',
	fontWeight: 'bold',
	borderRadius: '12px',
});
