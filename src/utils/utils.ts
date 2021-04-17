import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import { Maybe, Scalars } from '../types/graphql';

export function parseTime(time: string): string | null {
	if (time) {
		dayjs.extend(duration);
		const timeDuration = dayjs.duration({ hours: 0, minutes: 0 }).add(time);
		const days = timeDuration.days();
		const hours = timeDuration.hours();
		const minutes = timeDuration.minutes();
		let resultString = '';
		if (days > 0) {
			resultString += `${days}d `;
		}
		if (hours > 0) {
			resultString += `${hours}h `;
		}
		if (minutes > 0) {
			resultString += `${minutes}m `;
		}
		return resultString.trim();
	}
	return null;
}

export function getTime(days: number, hours: number, minutes: number): string {
	dayjs.extend(duration);
	const time = dayjs.duration({ days, hours, minutes });
	return time.toISOString();
}

export function formatDate(date: Maybe<Date>): string | null {
	if (date) {
		dayjs.extend(localizedFormat);
		return dayjs(date).format('L');
	}
	return null;
}

export function parseDate(date: Scalars['DateTime']): Date | null {
	if (date) {
		return dayjs(date).toDate();
	}
	return null;
}

export function formatLinkDisplayName(url: string): string {
	if (url.trim().length > 0) {
		let displayName = url.replace(/https?:\/\//, '');
		displayName =
			displayName.substring(0, displayName.indexOf('/')) +
			displayName.substring(displayName.lastIndexOf('/'));
		return displayName;
	}
	return '';
}
