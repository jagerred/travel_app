import searchReducer, {
	updateMain,
	updateFilter,
	fetchCityInfo,
} from 'redux/slices/searchSlice';

const initialState = {
	cityInfo: {
		name: '',
		photos: '',
	},
	loadStatus: 'idle',
	searchResult: [],
	searchLoadStatus: 'idle',
	searchFilter: '',
};
describe('searchReducers', () => {
	it('should return default state when passed an empty action', () => {
		const state = searchReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});
	it('should update search filter', () => {
		const state = searchReducer(initialState, {
			type: updateFilter.type,
			payload: 'text',
		});
		expect(state.searchFilter).toEqual('text');
	});
	it('should change loadStatus to "loading" with "fetchCityInfo.pending" action', () => {
		const state = searchReducer(initialState, fetchCityInfo.pending());
		expect(state.loadStatus).toBe('loading');
	});
	it('should change loadStatus to "error" with "fetchCityInfo.rejected" action', () => {
		const action = {
			type: fetchCityInfo.rejected.type,
		};
		const state = searchReducer(initialState, action);
		expect(state.loadStatus).toEqual('error');
	});
	it('should change loadStatus to "idle" and add city info with "fetchCityInfo.fulfilled" action', () => {
		const cityInfo = { name: 'name', photos: 'photos' };
		const state = searchReducer(
			initialState,
			fetchCityInfo.fulfilled(cityInfo)
		);
		expect(state.cityInfo).toEqual(cityInfo);
	});
});
