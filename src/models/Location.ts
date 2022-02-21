import Category from './Category';
import Position from './Position';

interface Location {
	name: string;
	description: string;
	categories: Array<Category>;
	position: Position;
}

export default Location;
