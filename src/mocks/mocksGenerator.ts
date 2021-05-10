import faker from 'faker';
import map from 'lodash/map';
import dayjs from 'dayjs';
import { Activity, Link, Track, TrackInput } from '../types/graphql';
import { TRACKS_LOAD_LIMIT } from '../utils/constants';

export function generateLink(trackId: string, id?: number): Link {
	const idStr = id ? `${id}` : `${faker.datatype.number()}`;
	return {
		__typename: 'Link',
		id: idStr,
		link: faker.internet.url(),
		mainLink: id === 2,
	};
}

export function generateLinks(trackId: string, limit = 0): Link[] {
	const links: Link[] = [];
	for (let i = 0; i < limit; i += 1) {
		links.push(generateLink(trackId, i));
	}
	return links;
}

export function generateActivities(): Activity[] {
	return map(
		['Trekking', 'Via Ferrata', 'Ciaspole', 'Scialpinismo', 'Passeggiata'],
		(value, index) => ({
			id: `${index}`,
			name: value,
			__typename: 'Activity',
		})
	);
}

export function generateActivity(id?: number): Activity {
	const activities = generateActivities();
	const index = id || faker.datatype.number(activities.length - 1);

	return activities[index];
}

export function generateTrack(id?: number | string): Track {
	const idStr = id !== undefined ? `${id}` : `${faker.datatype.number()}`;
	return {
		__typename: 'Track',
		altitudeDifference: faker.datatype.number(3000),
		description: faker.lorem.text(),
		id: idStr,
		length: faker.datatype.number({ max: 100, precision: 0.1 }),
		links: generateLinks(idStr, faker.datatype.number(5)),
		time: `PT${faker.datatype.number(36)}H${faker.datatype.number(59)}M`,
		title: faker.random.words(),
		uploadTime: faker.date.past().toISOString(),
		activity: generateActivity(),
	};
}

export function generateTracks(limit?: number): Track[] {
	const tracksNumber =
		limit ??
		faker.datatype.number({
			min: 1,
			max: TRACKS_LOAD_LIMIT,
		});

	const tracks: Track[] = [];
	for (let i = 0; i < tracksNumber; i += 1) {
		tracks.push(generateTrack(i));
	}
	return tracks;
}

export function convertTrackInputToTrack(trackInput: TrackInput): Track {
	const links = map(trackInput.links, (linkInput, index) => ({ ...linkInput, id: `${index}` }));
	const activity =
		trackInput.activity && Number.isInteger(trackInput.activity)
			? generateActivity(Number.parseInt(trackInput.activity, 10))
			: null;
	return {
		...trackInput,
		id: '',
		links,
		activity,
		uploadTime: dayjs().toISOString(),
	};
}
