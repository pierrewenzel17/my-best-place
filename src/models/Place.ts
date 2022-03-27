import { GeoPoint } from 'firebase/firestore';
import Category from './Category';

interface Place {
	name: string;
	description: string;
	categories: Array<Category>;
	position: GeoPoint;
	adresse: string;
}
export default Place;
