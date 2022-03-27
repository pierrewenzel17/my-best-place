import Place from './Place';

export interface Favori {
	user: string;
	place: Place;
}

export interface FavoriRead {
	id: string | undefined;
	fav: Favori;
}
