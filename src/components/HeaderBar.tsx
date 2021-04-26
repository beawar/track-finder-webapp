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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styled from '@emotion/styled';
import { HideOnScroll } from './HideOnScroll';
import { route } from '../routes';
import LogoImg from '../assets/logo.png';

interface HeaderBarProps {
	createOption?: boolean;
}

const Logo = styled.img`
	max-height: 70px;
`;

const CustomDrawer = styled(Drawer)`
	& .MuiDrawer-paper {
		${({ theme }) => theme.breakpoints.up('md')} {
			width: 25%;
		}
		${({ theme }) => theme.breakpoints.down('md')} {
			width: 40%;
		}
		${({ theme }) => theme.breakpoints.down('sm')} {
			width: 100%;
		}
	}
`;

export const HeaderBar: React.FC<HeaderBarProps> = ({ children, createOption = true }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const history = useHistory();

	const toggleDrawer = useCallback(() => {
		setDrawerOpen((prevState) => !prevState);
	}, []);

	const goToPath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history]
	);

	return (
		<>
			<HideOnScroll>
				<AppBar>
					<Toolbar>
						<IconButton edge="start" onClick={toggleDrawer}>
							<MenuIcon />
						</IconButton>
						<NavLink to={route.home}>
							<Logo src={LogoImg} alt="Track finder" />
						</NavLink>
						{children}
						{createOption && (
							<IconButton edge="end" onClick={goToPath(route.edit)}>
								<AddIcon fontSize="large" />
							</IconButton>
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<CustomDrawer open={drawerOpen} anchor="left">
				<Toolbar>
					<IconButton onClick={toggleDrawer} edge="end">
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<List>
					<ListItem button onClick={goToPath(route.home)}>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button onClick={goToPath(route.edit)}>
						<ListItemText primary="Create new track" />
					</ListItem>
				</List>
			</CustomDrawer>
			{/* this toolbar is used to fill the space under the appbar,
			so that the main content is not hidden */}
			<Toolbar />
		</>
	);
};
