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
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MenuIcon from '@material-ui/icons/Menu';
import styled from '@emotion/styled';
import { HideOnScroll } from './HideOnScroll';
import { route } from '../routes';
import LogoImg from '../assets/logo.png';
import { Scalars } from '../types/graphql';
import { FlexBox } from './StyledComponents';

interface HeaderBarProps {
	createOption?: boolean;
	editOption?: boolean;
	trackId?: Scalars['ID'];
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

const IconOptions = styled(FlexBox)`
	margin-right: 0;
	margin-left: auto;
`;

export const HeaderBar: React.FC<HeaderBarProps> = ({
	children,
	createOption = true,
	editOption,
	trackId,
}) => {
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
						<IconOptions>
							{createOption && (
								<IconButton onClick={goToPath(route.edit)}>
									<AddIcon sx={{ fontSize: '2rem' }} />
								</IconButton>
							)}
							{editOption && trackId && (
								<IconButton onClick={goToPath(`${route.edit}/${trackId}`)}>
									<EditRoundedIcon />
								</IconButton>
							)}
						</IconOptions>
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
