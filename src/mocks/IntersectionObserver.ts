interface IntersectionObserver {
	readonly root: Element | Document | null;
	readonly rootMargin: string;
	readonly thresholds: ReadonlyArray<number>;
	disconnect(): void;
	observe(target: Element): void;
	takeRecords(): IntersectionObserverEntry[];
	unobserve(target: Element): void;
}

type IntersectionObserverCallback = (
	entries: IntersectionObserverEntry,
	observer: IntersectionObserver,
) => unknown;

interface IntersectionObserverOptions {
	root: Element | Document | null;
	rootMargin: string;
	thresholds: ReadonlyArray<number>;
}

export const IntersectionObserverMock = (
	callback: IntersectionObserverCallback,
	options: IntersectionObserverOptions,
): IntersectionObserver => {
	let entries: Element[] = [];

	function disconnect(): void {
		entries = [];
	}

	function observe(target: Element): void {
		entries.push(target);
	}

	function unobserve(target: Element): void {
		const index = entries.indexOf(target);
		if (index > -1) {
			entries.splice(index, 1);
		}
	}

	return {
		root: options.root || null,
		rootMargin: options.rootMargin || '',
		thresholds: options.thresholds || [1],
		disconnect,
		observe,
		takeRecords: () => [],
		unobserve,
	};
};
