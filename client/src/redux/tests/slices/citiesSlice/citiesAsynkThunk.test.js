import { fetchCities } from 'redux/slices/citiesSlice';
import mockAxios from '__mocks__/axios';

const mockCity = [
	{
		_id: 'id',
		districts: [
			{
				district: 'Прикубанский',
				isActive: false,
			},
		],
		name: 'Краснодар',
		photos: 'https://bron-top.ru/f/places/101/krasnodar-gorod.jpg',
		places: [
			{
				name: 'Красная улица (Александровский бульвар)',
				address: 'ул. Красная',
				location: '',
				photos:
					'https://funart.pro/uploads/posts/2021-04/1618704934_15-funart_pro-p-krasnodar-ul-krasnaya-krasivie-mesta-foto-15.jpg',
				description:
					'Александровский бульвар — одно из лучших мест для пеших вечерних прогулок в Краснодаре. Сам бульвар располагается на улице Красной, ведущей свою историю ещё с XIX века. Название происходит от слова «красный», которым называли что-то красивое или, в случае с улицей, парадное. По другой версии, всему причиной находившиеся здесь торговые ряды, построенные из красного кирпича, из-за чего вся улица приобретала характерный оттенок. Несмотря на то что улица неоднократно переименовывалась, нося имя Сталина и Шевченко, по итогу она вновь стала Красной и закрепила своё историческое название. Здесь расположены интереснейшие достопримечательности города',
				category: 'd00',
				subcategory: 'd00plc',
				likes: 0,
				reviews: [],
				district: 'Центральный',
				rating: 8.8,
				localsChoice: true,
				id: 'zilant-statue',
			},
		],
	},
];

describe('citiesSlice', () => {
	afterEach(() => mockAxios.reset());

	it('should fetchCities with resolved responce', async () => {
		const dispatch = jest.fn();
		mockAxios.get.mockResolvedValue({
			status: 200,
			data: mockCity,
		});
		const thunk = fetchCities();

		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		const [start, end] = calls;

		expect(start[0].type).toBe(fetchCities.pending().type);
		expect(end[0].type).toBe(fetchCities.fulfilled().type);
		expect(end[0].payload).toBe(mockCity);
	});
	it('should fetchCities with reject responce', async () => {
		const dispatch = jest.fn();
		mockAxios.get.mockResolvedValue(Promise.reject(new Error('error')));
		const thunk = fetchCities();
		await thunk(dispatch);
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);
		const [start, end] = calls;
		expect(start[0].type).toBe(fetchCities.pending().type);
		expect(end[0].type).toBe(fetchCities.rejected().type);
		expect(end[0].meta.rejectedWithValue).toBe(true);
		expect(end[0].payload).toBe('error');
	});
});
