import Search from 'components/shared/Search/Search';
import PlaceCategories from 'components/placeFilters/PlaceCategories/PlaceCategories';
import LocalsChoice from 'components/placeFilters/LocalsChoice/LocalsChoice';
import FilterResult from 'components/placeFilters/FilterResult/FilterResult';
import Filters from 'components/placeFilters/Filters/Filters';
const CityPage = () => {
	return (
		<>
			<Search isMain={false} searchPlaceholder={'Введите место'} />
			<PlaceCategories />
			<div className='places-filter'>
				<Filters />
				<FilterResult />
			</div>
		</>
	);
};
export default CityPage;
