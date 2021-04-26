import { getTracksHandler } from './getTracksHandler';
import { getTrackHandler } from './getTrackHandler';
import { getActivitiesHandler } from './getActivitiesHandler';
import { introspectionHandler } from './introspectionHandler';
import { createTrackHandler } from './createTrackHandler';
import { updateTrackHandler } from './updateTrackHandler';

export const handlers = [
	getTracksHandler,
	introspectionHandler,
	getActivitiesHandler,
	getTrackHandler,
	createTrackHandler,
	updateTrackHandler,
];
