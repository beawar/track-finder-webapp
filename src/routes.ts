export interface Routes {
	[key: string]: string;
}

export const route: Routes = {
	edit: '/edit',
	track: '/track/:id',
	error: '*',
	home: '/',
};
