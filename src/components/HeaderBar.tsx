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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { HideOnScroll } from './HideOnScroll';
import { route } from '../routes';

export const HeaderBar: React.FC = ({ children }) => {
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
						<IconButton edge="end" onClick={addNewTrack}>
							<AddCircleIcon />
						</IconButton>
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
