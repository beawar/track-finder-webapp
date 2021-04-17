import React, { useCallback, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
	AppBar,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { HideOnScroll } from './HideOnScroll';
import { route } from '../routes';

interface HeaderBarProps {
	createOption?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ children, createOption = true }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const history = useHistory();

	const toggleDrawer = useCallback(() => {
		setDrawerOpen((prevState) => !prevState);
	}, []);

	const addNewTrack = useCallback(() => {
		history.push(route.edit);
	}, [history]);

	return (
		<>
			<HideOnScroll>
				<AppBar>
					<Toolbar>
						<IconButton edge="start" onClick={toggleDrawer}>
							<MenuIcon />
						</IconButton>
						<NavLink to={route.home}>
							<Typography variant="h6">Track finder</Typography>
						</NavLink>
						{children}
						{createOption && (
							<IconButton edge="end" onClick={addNewTrack}>
								<AddIcon fontSize="large" />
							</IconButton>
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Drawer open={drawerOpen} anchor="left">
				<Toolbar>
					<IconButton onClick={toggleDrawer} edge="end">
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<List>
					{['Boh', 'Boh ma piu lungo'].map((text) => (
						<ListItem button key={text}>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			{/* this toolbar is used to fill the space under the appbar,
			so that the main content is not hidden */}
			<Toolbar />
		</>
	);
};
