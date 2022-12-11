import * as reduxHooks from 'react-redux';
import Cities from './Cities';
import { renderWithRoutes } from 'tests/helpers/renderWithRoutes';

jest.mock('react-redux');
const useStateCB = {
	items: [
		{
			_id: 'id',
			name: 'Краснодар',
			places: [],
			districts: [],
			photos: '',
		},
	],
	isSearch: false,
	loadStatus: 'idle',
};
const useStateEmptyCB = {
	items: [],
	isSearch: false,
	loadStatus: 'idle',
};

const mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const dispatch = jest.fn();
describe('Cities', () => {
	it('should create Cities with city items array ', () => {
		mockUseSelector.mockReturnValue(useStateEmptyCB);
		mockUseDispatch.mockReturnValue(dispatch);
		const component = renderWithRoutes(<Cities />);
		expect(component).toMatchSnapshot();
	});
	it('should create Cities with empty city items array ', () => {
		mockUseSelector.mockReturnValue(useStateCB);
		mockUseDispatch.mockReturnValue(dispatch);
		const component = renderWithRoutes(<Cities />);
		expect(component).toMatchSnapshot();
	});
});
