import Search from './Search';
import * as reduxHooks from 'react-redux';
import { renderWithRoutes } from 'tests/helpers/renderWithRoutes';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectSearch } from 'redux/selectors/searchSelectors';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('react-redux');
jest.mock('redux/selectors/searchSelectors');
jest.mock('redux/selectors/globalSelectors');

const mockState = {
	search: {
		searchFilter: '',
		cityInfo: {
			name: 'name',
		},
		searchResult: [],
		opened: false,
		loadStatus: 'idle',
		searchLoadStatus: 'idle',
	},
	theme: {
		darkTheme: false,
	},
};
describe('FilterResult component', () => {
	beforeEach(() => {
		const mockUseSelector = jest
			.spyOn(reduxHooks, 'useSelector')
			.mockImplementation(cb => cb(mockState));
		let mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
		const dispatch = jest.fn();
		mockUseDispatch.mockReturnValue(dispatch);
		selectDarkTheme.mockReturnValue(mockState.theme.darkTheme);
		selectSearch.mockReturnValue(mockState.search);
	});
	it('should match with snapshot', () => {
		const component = renderWithRoutes(<Search />);
		expect(component).toMatchSnapshot();
	});

	it('should change value after user input', () => {
		renderWithRoutes(<Search />);
		const input = screen.getByRole('textbox');
		userEvent.type(input, 'text');
		expect(input.value).toBe('text');
	});
});
