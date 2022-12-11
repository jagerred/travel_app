import filtersReducer, {
	updateAllFilters,
	addFilter,
	deleteFilter,
	toggleDistricts,
	fetchDistricts,
} from 'redux/slices/filtersSlice';

const initialState = {
	districtsStatus: 'loading',
	districts: [],
	mobileVisible: false,
	filters: {
		category: [],
		subcategory: [],
		district: [],
		sort: ['name', 'asc'],
		highRating: false,
		localsChoice: false,
		currentPage: 1,
	},
};
const filters = {
	category: ['cat'],
	subcategory: ['sub'],
	district: ['district'],
	sort: ['name', 'asc'],
	highRating: false,
	localsChoice: false,
	currentPage: 1,
};
describe('filtersSlice', () => {
	it('should return default state when passed an empty action', () => {
		const result = filtersReducer(undefined, { type: '' });
		expect(result).toEqual(initialState);
	});
	it('should update filters with "updateAllFilters"', () => {
		const result = filtersReducer(initialState, {
			type: updateAllFilters.type,
			payload: filters,
		});
		console.log(result);
		expect(result.filters).toEqual(filters);
	});
	it('should add filter by type & change currentPage to 1 with "addFilter"', () => {
		const result = filtersReducer(initialState, {
			type: addFilter.type,
			payload: { type: 'category', filter: 'filter' },
		});
		expect(result.filters).toEqual({
			...initialState.filters,
			category: ['filter'],
		});
		expect(result.filters.currentPage).toBe(1);
	});
	it('should delete filter by type & change currentPage to 1 with "deleteFilter"', () => {
		const result = filtersReducer(
			{
				filters: {
					category: ['filter'],
					currentPage: 2,
				},
			},
			{
				type: deleteFilter.type,
				payload: { type: 'category', filter: 'filter' },
			}
		);
		expect(result.filters.category).toEqual([]);
		expect(result.filters.currentPage).toBe(1);
	});
	it('should toggle active district & change currentPage to 1 with "toggleDistricts"', () => {
		const initialDistricts = {
			districts: [
				{ district: 'district1', isActive: false },
				{ district: 'district2', isActive: false },
			],
			filters: { currentPage: 3 },
		};
		const result = filtersReducer(initialDistricts, {
			type: toggleDistricts.type,
			payload: 'district2',
		});
		expect(result.districts[1].isActive).toBe(true);
		expect(result.filters.currentPage).toBe(1);
	});

	it('should change districtsStatus with "fetchDistricts.pending" action', () => {
		const state = filtersReducer(initialState, fetchDistricts.pending());
		expect(state.districtsStatus).toBe('loading');
	});
	it('should change districtsfetc with "fetchDistricts.rejected" action', () => {
		const action = {
			type: fetchDistricts.rejected.type,
		};
		const state = filtersReducer(initialState, action);
		expect(state.districtsStatus).toEqual('error');
	});
	it('should change districtsStatus and add districts with "fetchDistricts.fulfilled" action', () => {
		const districts = ['district'];
		const state = filtersReducer(
			initialState,
			fetchDistricts.fulfilled(districts)
		);
		expect(state).toEqual({
			...initialState,
			districts,
			districtsStatus: 'idle',
		});
	});
});
