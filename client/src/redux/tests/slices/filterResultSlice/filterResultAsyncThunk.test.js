import {
	fetchPlaces,
	putLike,
	putRating,
	updateLikes,
} from 'redux/slices/filterResultSlice';
import mockAxios from '__mocks__/axios';

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

describe('citiesSlice', () => {
	afterEach(() => mockAxios.reset());

	it('should fetchPlaces with resolved responce', async () => {
		const dispatch = jest.fn();
		mockAxios.get.mockResolvedValue({
			data: placesFromServer,
		});
		const thunk = fetchPlaces({ id: 'id', filters: 'filters' });

		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		const [start, end] = calls;

		expect(start[0].type).toBe(fetchPlaces.pending().type);
		expect(end[0].type).toBe(fetchPlaces.fulfilled().type);
		expect(end[0].payload).toBe(placesFromServer);
	});
	it('should fetchPlaces with reject responce', async () => {
		const dispatch = jest.fn();
		mockAxios.get.mockResolvedValue(Promise.reject(new Error('error')));
		const thunk = fetchPlaces({ id: 'id', filters: 'filters' });
		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		const [start, end] = calls;
		expect(start[0].type).toBe(fetchPlaces.pending().type);
		expect(end[0].type).toBe(fetchPlaces.rejected().type);
		expect(end[0].meta.rejectedWithValue).toBe(true);
		expect(end[0].payload).toBe('error');
	});

	it('should post like and update likes with resolved responce', async () => {
		const dispatch = jest.fn();
		mockAxios.put.mockResolvedValue({ data: () => Promise.resolve() });
		const data = {
			cityId: 'id',
			placeId: 'id',
			likeCount: { likes: 22 },
		};
		const actionCall = updateLikes({
			placeId: data.placeId,
			likes: data.likeCount.likes,
		});
		const thunk = putLike(data);
		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(3);
		const [start, middle, end] = calls;
		expect(start[0].type).toBe(putLike.pending().type);
		expect(middle[0].type).toBe(updateLikes.type);
		expect(end[0].type).toBe(putLike.fulfilled().type);
		expect(dispatch).toHaveBeenCalledWith(actionCall);
	});
	it('should post like and update likes with reject responce', async () => {
		const dispatch = jest.fn();
		mockAxios.put.mockResolvedValue(Promise.reject(new Error('error')));
		const thunk = putLike({
			cityId: 'id',
			placeId: 'id',
			likeCount: { likes: 22 },
		});

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		console.log(calls);
		const [start, end] = calls;
		expect(start[0].type).toBe(putLike.pending().type);
		expect(end[0].type).toBe(putLike.rejected().type);
		expect(end[0].meta.rejectedWithValue).toBe(true);
		expect(end[0].payload).toBe('error');
	});
});
