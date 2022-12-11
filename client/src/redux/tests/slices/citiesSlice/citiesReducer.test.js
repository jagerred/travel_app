import citiesReducer, {
	fetchCities,
	setIsSearch,
} from 'redux/slices/citiesSlice';

const initialState = {
	items: [],
	status: 'idle',
	isSearch: false,
	error: null,
};

describe('citiesSlice', () => {
	it('should return default state when passed an empty action', () => {
		const result = citiesReducer(undefined, { type: '' });
		expect(result).toEqual(initialState);
	});
	it('should set isSearch value', () => {
		const result = citiesReducer(initialState, {
			type: setIsSearch.type,
			payload: true,
		});
		expect(result.isSearch).toBe(true);
	});
	it('should change status with "fetchCities.pending" action', () => {
		const state = citiesReducer(initialState, fetchCities.pending());
		expect(state.status).toBe('loading');
	});
	it('should change status and error with "fetchCities.rejected" action', () => {
		const action = {
			type: fetchCities.rejected.type,
			payload: 'Get error',
		};
		const state = citiesReducer(initialState, action);
		expect(state).toEqual({
			items: [],
			status: 'rejected',
			isSearch: false,
			error: 'Get error',
		});
	});
	it('should change status and add cities with "fetchCities.fulfilled" action', () => {
		const items = ['item'];
		const state = citiesReducer(initialState, fetchCities.fulfilled(items));
		expect(state).toEqual({
			items: ['item'],
			status: 'idle',
			isSearch: false,
			error: null,
		});
	});
});
