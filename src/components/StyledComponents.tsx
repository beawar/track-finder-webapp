import styled from '@emotion/styled';
import { Box } from '@material-ui/core';

export const FlexBox = styled(Box)`
	display: flex;
	gap: 0.5rem;
`;

export const ChipsContainer = styled(FlexBox)`
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	gap: 0.5rem;
	flex-wrap: wrap;
	justify-content: flex-start;
`;
