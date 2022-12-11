import filterResultReducer, {
	updateLikes,
	fetchPlaces,
} from 'redux/slices/filterResultSlice';

const initialState = {
	places: [],
	loadStatus: 'idle',
	pages: 1,
	totalPlaces: 0,
	postError: null,
};
const placesFromServer = [
	{
		id: '1',
		likes: 11,
	},
	{
		id: '2',
		likes: 22,
	},
];
const stateWithPlaces = {
	places: [...placesFromServer],
	loadStatus: 'idle',
	pages: 1,
	totalPlaces: 0,
	postError: null,
};
describe('filterResultReducers', () => {
	it('should return default state when passed an empty action', () => {
		const state = filterResultReducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});
	it('should update likes', () => {
		const state = filterResultReducer(stateWithPlaces, {
			type: updateLikes.type,
			payload: {
				placeId: '2',
				likes: 23,
			},
		});
		expect(state.places[1].likes).toEqual(23);
	});

	it('should change loadStatus to "loading" with "fetchPlaces.pending" action', () => {
		const state = filterResultReducer(initialState, fetchPlaces.pending());
		expect(state.loadStatus).toBe('loading');
	});
	it('should change loadStatus to "error" with "fetchPlaces.rejected" action', () => {
		const action = {
			type: fetchPlaces.rejected.type,
		};
		const state = filterResultReducer(initialState, action);
		expect(state.loadStatus).toEqual('error');
	});
	it('should change loadStatus to "idle", add places,pages and totalPlaces with "fetchPlaces.fulfilled" action', () => {
		const state = filterResultReducer(
			initialState,
			fetchPlaces.fulfilled({
				places: placesFromServer,
				pageCount: 3,
				totalPlaces: 2,
			})
		);
		console.log(state);
		expect(state.places).toEqual(placesFromServer);
		expect(state.pages).toEqual(3);
		expect(state.totalPlaces).toEqual(2);
		expect(state.loadStatus).toEqual('idle');
	});
});
