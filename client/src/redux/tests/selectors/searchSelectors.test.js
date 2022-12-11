import { selectCityName, selectSearch } from 'redux/selectors/searchSelectors';

const search = {
	cityInfo: {
		name: 'city name',
	},
	searchFilter: 'City',
};

describe('redux searchSelectors', () => {
	it('should select city name from state object', () => {
		const name = search.cityInfo.name;
		const result = selectCityName({ search });
		expect(result).toEqual(name);
	});
	it('should select search from state object', () => {
		const result = selectSearch({ search });
		expect(result).toEqual(search);
	});
	it('should select search filter from state object', () => {
		const result = selectSearch({ search });
		expect(result.searchFilter).toEqual(search.searchFilter);
	});
});
