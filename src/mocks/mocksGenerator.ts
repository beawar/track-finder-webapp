import faker from 'faker';
import { Link, Track } from '../types/graphql';

function generateLink(trackId: string, id?: number): Link {
	const idStr = id ? `${id}` : `${faker.random.number()}`;
	return {
		__typename: 'Link',
		id: idStr,
		link: faker.internet.url(),
		mainLink: id === 2,
	};
}

function generateLinks(trackId: string, limit = 0): Link[] {
	const links: Link[] = [];
	for (let i = 0; i < limit; i += 1) {
		links.push(generateLink(trackId, i));
	}
	return links;
}

function generateTrack(id?: number): Track {
	const idStr = id ? `${id}` : `${faker.random.number()}`;
	return {
		__typename: 'Track',
		altitudeDifference: faker.random.number(3000),
		description: faker.lorem.text(),
		id: idStr,
		length: faker.random.number({ max: 100, precision: 0.1 }),
		links: generateLinks(idStr, faker.random.number(5)),
		time: `PT${faker.random.number(36)}H${faker.random.number(59)}M`,
		title: faker.random.words(),
		uploadTime: faker.date.past().toISOString(),
	};
}

export function generateTracks(limit?: number): Track[] {
	let tracksNumber = limit;
	if (!tracksNumber) {
		tracksNumber = faker.random.number({ min: 1, max: 25 });
	}
	const tracks: Track[] = [];
	for (let i = 0; i < tracksNumber; i += 1) {
		tracks.push(generateTrack(i));
	}
	return tracks;
}
