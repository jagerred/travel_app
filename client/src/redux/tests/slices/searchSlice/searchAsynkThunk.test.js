import { fetchCityInfo } from 'redux/slices/searchSlice';
import mockAxios from '__mocks__/axios';

const mockCityInfo = {
	name: 'name',
	photos: 'photos',
};

describe('citiesSlice', () => {
	afterEach(() => mockAxios.reset());

	it('should fetchCityInfo with resolved responce', async () => {
		const dispatch = jest.fn();
		mockAxios.get.mockResolvedValue({
			data: mockCityInfo,
		});
		const thunk = fetchCityInfo('id');

		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		const [start, end] = calls;

		expect(start[0].type).toBe(fetchCityInfo.pending().type);
		expect(end[0].type).toBe(fetchCityInfo.fulfilled().type);
		expect(end[0].payload).toBe(mockCityInfo);
	});
});
