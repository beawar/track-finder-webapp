import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
	Button,
	Container,
	Divider,
	IconButton,
	InputAdornment,
	Radio,
	Typography,
} from '@material-ui/core';
import AddLinkRoundedIcon from '@material-ui/icons/AddLinkRounded';
import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
import { FieldArray, FieldArrayRenderProps, Form, Formik, FormikErrors, FormikProps } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import map from 'lodash/map';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { HeaderBar } from '../components/HeaderBar';
import { InputText } from '../components/form/InputText';
import { InputNumber } from '../components/form/InputNumber';
import { InputSelection, SelectionOption } from '../components/form/inputSelection';
import {
	Activity,
	LinkInput,
	useCreateTrackMutation,
	useGetActivitiesQuery,
	useGetTrackQuery, useUpdateTrackMutation,
} from '../types/graphql';
import { getTime, parseTime } from '../utils/utils';
import { InputLink } from '../components/form/InputLink';

interface EditTrackPageRouteParams {
	trackId: string;
}

interface FormLinkInput {
	url: string;
	label: string;
}

interface FormValues {
	title: string;
	description: string;
	activity: SelectionOption<Activity> | null;
	distance: number;
	days: number;
	hours: number;
	minutes: number;
	altitude: number;
	links: FormLinkInput[];
	mainLink: string | null;
}

const MainContainer = styled(Container)`
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: ${({ theme }) => theme.spacing(3)};
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;

const FormContainer = styled(Form)`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	justify-content: space-between;
`;

const FormBox = styled(Container)`
	display: flex;

	${({ theme }) => theme.breakpoints.up('md')} {
		flex-basis: 49%;
	}

	${({ theme }) => theme.breakpoints.up('lg')} {
		margin: 0;
	}

	flex-direction: column;
`;

const LinkInputContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
	gap: 0.5rem;

	${({ theme }) => theme.breakpoints.up(theme.breakpoints.width('lg') + 80)} {
		min-width: calc(${({ theme }) => theme.breakpoints.width('sm') * 2}px + 2rem);
		margin-left: 3px;
		margin-right: -3px;
	}

	${({ theme }) => theme.breakpoints.down('md')} {
		max-width: ${({ theme }) => theme.breakpoints.width('sm')}px;
		margin: 0;
	}

	& > div {
		max-width: ${({ theme }) => theme.breakpoints.width('sm')}px;

		${({ theme }) => theme.breakpoints.up('md')} {
			flex-basis: 49%;
		}
	}
`;

const FormRow = styled.div`
	display: flex;
	gap: 0.5rem;
	justify-content: space-between;
	align-items: flex-start;
`;

const LinkFormRow = styled(FormRow)`
	justify-content: center;

	${({ theme }) => theme.breakpoints.up(theme.breakpoints.width('lg') + 80)} {
		justify-content: unsafe center;
	}

	${({ theme }) => theme.breakpoints.down('sm')} {
		flex-wrap: wrap;

		.MuiIconButton-root {
			margin-right: 0;
			margin-left: auto;
		}

		.MuiRadio-root {
			margin-left: 0;
			margin-right: auto;
		}
	}
`;

const LinksContainer = styled(Container)``;

const FooterBox = styled(Container)`
	display: flex;
	flex: 0 0 100%;
	margin: unset;
	flex-direction: row-reverse;
`;

const validationSchema = yup.object().shape({
	title: yup.string().required('Title is required').trim(),
	description: yup.string().trim(),
	activity: yup
		.object()
		.shape({
			label: yup.string(),
			value: yup.object().shape({
				id: yup.string(),
				name: yup.string(),
			}),
		})
		.nullable()
		.required(),
	distance: yup
		.number()
		.typeError('You must specify a number')
		.min(0, 'Distance must be greater than 0'),
	days: yup
		.number()
		.typeError('You must specify a number')
		.min(0, 'Number of days must be greater than or equal to 0')
		.integer('Insert an integer, use hours for fractional amount of time'),
	hours: yup
		.number()
		.typeError('You must specify a number')
		.min(0, 'Number of hours must be greater than or equal to 0')
		.integer('Insert an integer, use minutes for fractional amount of time'),
	minutes: yup
		.number()
		.typeError('You must specify a number')
		.min(0, 'Number of minutes must be greater than or equal to 0')
		.integer('Take a breath and use an integer'),
	altitude: yup.number().typeError('You must specify a number').round('round'),
	links: yup.array().of(
		yup.object().shape({
			url: yup
				.string()
				.url('Link must be a valid url')
				.when('label', {
					is: (label: string) => label?.length > 0,
					then: yup.string().required('Specify a URL or clean the display name'),
				}),
			label: yup.string(),
		})
	),
	mainLink: yup.number().nullable(),
});

const EditTrackPage: React.FC = () => {
	const { trackId } = useParams<EditTrackPageRouteParams>();
	const { data: trackData } = useGetTrackQuery({
		variables: {
			id: trackId,
		},
		skip: !trackId,
	});
	const { data: activityList } = useGetActivitiesQuery();
	const [createTrack] = useCreateTrackMutation({
		refetchQueries: ['getTracks'],
	});
	const [updateTrack] = useUpdateTrackMutation({
		refetchQueries: ['getTracks'],
	});
	const history = useHistory();

	const initialValues = useMemo(() => {
		const track = trackData?.getTrack;
		const activity = track?.activity && {
			label: track.activity.name,
			value: track.activity,
		};
		let time;
		if (track?.time) {
			time = parseTime(track.time);
		}
		let mainLink: number | null = null;
		const links =
			track?.links &&
			map(track.links, (link, index) => {
				if (link.mainLink) {
					mainLink = index;
				}
				return {
					url: link.link,
					label: '',
				};
			});
		return {
			title: track?.title || '',
			description: track?.description || '',
			activity: activity || null,
			distance: track?.length || 0,
			days: time?.days() || 0,
			hours: time?.hours() || 0,
			minutes: time?.minutes() || 0,
			altitude: track?.altitudeDifference || 0,
			links: links || [{ url: '', label: '' }],
			mainLink,
		};
	}, [trackData?.getTrack]);

	const submitHandler = useCallback(
		(values: FormValues, { setSubmitting }) => {
			const links: LinkInput[] = map(values.links, (link, index) => ({
				link: link.url,
				mainLink: index.toString() === values.mainLink,
			}));

			new Promise(() => {
				if (!trackId) {
					return createTrack({
						variables: {
							track: {
								title: values.title,
								description: values.description,
								activity: values.activity?.value.id || null,
								altitudeDifference: values.altitude,
								length: values.distance,
								time: getTime(values.days, values.hours, values.minutes),
								links,
							},
						},
					});
				}
				return updateTrack({
					variables: {
						id: trackId,
						track: {
							title: values.title,
							description: values.description,
							activity: values.activity?.value.id || null,
							altitudeDifference: values.altitude,
							length: values.distance,
							time: getTime(values.days, values.hours, values.minutes),
							links,
						},
					},
				});
			}).then(() => {
				setSubmitting(false);
				history.push('/');
			});
		},
		[createTrack, history, trackId, updateTrack]
	);

	const activities = useMemo(() => {
		return (
			activityList?.getActivities.map((activity: Activity) => ({
				label: activity.name,
				value: activity,
			})) || []
		);
	}, [activityList]);

	const inputLinks = useCallback(
		(values: FormValues, errors: FormikErrors<unknown>, handleChange) => ({
			remove,
			push,
		}: FieldArrayRenderProps) => {
			return (
				<>
					{map(values.links, (link, index) => (
						<LinkFormRow key={index}>
							<Radio
								name="mainLink"
								checked={values.mainLink === index.toString()}
								value={index}
								onChange={handleChange}
								title="Main link"
								sx={{ alignSelf: 'center' }}
							/>
							<LinkInputContainer disableGutters>
								<InputLink
									name={`links.${index}`}
									urlLabel={`Link ${index + 1}`}
									labelLabel={`Display name ${index + 1}`}
								/>
							</LinkInputContainer>
							<IconButton
								aria-label="delete"
								onClick={() => remove(index)}
								sx={{ alignSelf: 'center' }}
							>
								<DeleteRoundedIcon />
							</IconButton>
						</LinkFormRow>
					))}
					<FormRow>
						<IconButton aria-label="add link" onClick={() => push('')}>
							<AddLinkRoundedIcon />
						</IconButton>
					</FormRow>
				</>
			);
		},
		[]
	);

	const formComponent = useCallback(
		({ values, errors, handleChange }: FormikProps<FormValues>): React.ReactNode => {
			return (
				<FormContainer>
					<FormBox maxWidth="sm" disableGutters>
						<InputText label="Title" name="title" />
						<InputText label="Description" name="description" multiline rows={20} />
					</FormBox>
					<FormBox maxWidth="sm" disableGutters>
						<InputSelection label="Activity" name="activity" options={activities} />
						<FormRow>
							<InputNumber
								label="Distance"
								name="distance"
								InputProps={{
									endAdornment: <InputAdornment position="start">Km</InputAdornment>,
								}}
							/>
							<InputNumber
								label="Altitude"
								name="altitude"
								InputProps={{
									endAdornment: <InputAdornment position="start">m</InputAdornment>,
								}}
							/>
						</FormRow>
						<FormRow>
							<InputNumber label="Days" name="days" />
							<InputNumber label="Hours" name="hours" />
							<InputNumber label="Minutes" name="minutes" />
						</FormRow>
					</FormBox>
					<LinksContainer disableGutters>
						<FieldArray name="links">{inputLinks(values, errors, handleChange)}</FieldArray>
					</LinksContainer>
					<FooterBox disableGutters>
						<Button variant="contained" type="submit">
							Submit
						</Button>
					</FooterBox>
				</FormContainer>
			);
		},
		[]
	);

	return (
		<>
			<HeaderBar createOption={false} />
			<MainContainer>
				<TitleContainer>
					<AddLocationRoundedIcon fontSize="large" color="primary" />
					<Typography variant="h4" sx={{ marginY: '1rem' }} textAlign="center">
						Create a new track
					</Typography>
				</TitleContainer>
				<Divider variant="middle" sx={{ marginY: '1rem' }} />
				<Formik
					initialValues={initialValues}
					onSubmit={submitHandler}
					validationSchema={validationSchema}
					enableReinitialize
					key={`edit-${trackId}`}
				>
					{formComponent}
				</Formik>
			</MainContainer>
		</>
	);
};

export default EditTrackPage;
