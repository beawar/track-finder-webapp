import { getTracksHandler } from './getTracksHandler';
import { getActivitiesHandler } from './getActivitiesHandler';
import { introspectionHandler } from './introspectionHandler';

export const handlers = [getTracksHandler, introspectionHandler, getActivitiesHandler];
