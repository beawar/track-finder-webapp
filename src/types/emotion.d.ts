import { Theme as MaterialUITheme } from '@material-ui/core';

// Re-declare the emotion theme to have the properties of the MaterialUiTheme
declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends MaterialUITheme {}
}
