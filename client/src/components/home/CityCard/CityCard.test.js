import { screen } from '@testing-library/react';
import { renderWithRoutes } from 'tests/helpers/renderWithRoutes';
import CityCard from './CityCard';
const props = {
	id: '1',
	name: 'City',
	photos: 'photo-link',
	places: [1, 1, 1],
};
describe('CityCard', () => {
	it('CityCard renders', () => {
		renderWithRoutes(<CityCard {...props} />);
		expect(screen.getByText(/city/i)).toBeInTheDocument();
	});
	it('CityCard snapshot', () => {
		const component = renderWithRoutes(<CityCard {...props} />);
		expect(component).toMatchSnapshot();
	});
});
