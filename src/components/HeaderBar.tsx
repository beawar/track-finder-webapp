import React from 'react';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { HideOnScroll } from './HideOnScroll';

export const HeaderBar: React.FC = ({ children }) => {
	return (
		<>
			<HideOnScroll>
				<AppBar>
					<Toolbar>
						<IconButton edge="start">
							<MenuIcon />
						</IconButton>
						{children}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			{/* this toolbar is used to fill the space under the appbar, so that the main content is not hidden */}
			<Toolbar />
		</>
	);
};
