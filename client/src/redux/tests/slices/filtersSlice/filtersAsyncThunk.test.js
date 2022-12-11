import { fetchDistricts } from 'redux/slices/filtersSlice';
import mockAxios from '__mocks__/axios';

const dispatch = jest.fn();

describe('filtersAsynkThunk', () => {
	afterEach(() => mockAxios.reset());
	it('should fetchDistricts with resolved responce', async () => {
		mockAxios.get.mockResolvedValue({
			data: [{ name: 'district' }, { name: 'district2' }],
		});
		const thunk = fetchDistricts('id');
		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		const [start, end] = calls;
		expect(start[0].type).toBe(fetchDistricts.pending().type);
		expect(end[0].type).toBe(fetchDistricts.fulfilled().type);
		expect(end[0].payload).toEqual([
			{ name: 'district' },
			{ name: 'district2' },
		]);
	});
	it('should fetchDistricts with rejected responce', async () => {
		mockAxios.get.mockResolvedValue(Promise.reject(new Error('error')));
		const thunk = fetchDistricts('id');
		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		const [start, end] = calls;
		expect(start[0].type).toBe(fetchDistricts.pending().type);
		expect(end[0].type).toBe(fetchDistricts.rejected().type);
		expect(end[0].payload).toBe('error');
		expect(end[0].meta.rejectedWithValue).toBe(true);
	});
});
