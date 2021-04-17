import faker from 'faker';
import map from 'lodash/map';
import { Activity, Link, Track } from '../types/graphql';
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

const activities = ['Trekking', 'Via Ferrata', 'Ciaspole', 'Scialpinismo', 'Passeggiata'];

export function generateActivities(): Activity[] {
	return map(activities, (activity, index) => ({
		id: index.toString(),
		name: activity,
		__typename: 'Activity',
	}));
}

export function generateActivity(name?: string): Activity {
	const index = faker.datatype.number(activities.length - 1);

	return {
		id: `${name ? index : index + 1}`,
		name: name || activities[index],
	};
}

export function generateTrack(id?: number): Track {
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
		limit !== undefined
			? limit
			: faker.datatype.number({
					min: 1,
					max: TRACKS_LOAD_LIMIT,
			  });

	const tracks: Track[] = [];
	for (let i = 0; i < tracksNumber; i += 1) {
		tracks.push(generateTrack(i));
	}
	return tracks;
}
