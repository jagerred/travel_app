import FilterResult from './FilterResult';
import * as reduxHooks from 'react-redux';

import {
	selectFilterResult,
	selectFilterResultTotal,
	selectFilters,
	selectFiltersSort,
} from 'redux/selectors/filtersSelectors';
import {
	selectCityName,
	selectSearchFilter,
} from 'redux/selectors/searchSelectors';

import { renderWithRoutes } from 'tests/helpers/renderWithRoutes';

const mockState = {
	filterResult: {
		places: [],
		totalPlaces: 2,
		loadStatus: 'idle',
	},
	search: {
		searchFilter: '',
		cityInfo: {
			name: 'name',
		},
	},
	filters: {
		filters: {
			sort: ['name', 'desc'],
		},
	},
};
jest.mock('react-redux');
jest.mock('redux/selectors/searchSelectors');
jest.mock('redux/selectors/filtersSelectors');

describe('FilterResult component', () => {
	beforeEach(() => {
		const mockUseSelector = jest
			.spyOn(reduxHooks, 'useSelector')
			.mockImplementation(cb => cb(mockState));
		let mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
		const dispatch = jest.fn();
		mockUseDispatch.mockReturnValue(dispatch);
		selectFilterResult.mockReturnValue(mockState.filterResult);
		selectFilterResultTotal.mockReturnValue(mockState.filterResult.totalPlaces);
		selectFilters.mockReturnValue(mockState.filters);
		selectFiltersSort.mockReturnValue(mockState.filters.filters.sort);
	});
	it('should match with snapshot', () => {
		const component = renderWithRoutes(<FilterResult />);
		expect(component).toMatchSnapshot();
	});
});
