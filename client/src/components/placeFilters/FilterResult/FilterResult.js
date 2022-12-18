import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { fetchPlaces } from 'redux/slices/filterResultSlice';
import {
	updateSort,
	toggleMobileVisible,
	toggleSwitch,
	updateAllFilters,
} from 'redux/slices/filtersSlice';
import {
	selectFilterResult,
	selectFilterResultTotal,
	selectFilters,
	selectFiltersSort,
} from 'redux/selectors/filtersSelectors';
import {
	selectCityName,
	selectSearchFilter,
} from 'redux/selectors/searchSelectors';
import PlaceCard from 'components/placeFilters/PlaceCard/PlaceCard';
import PlaceCardSkeleton from 'components/placeFilters/PlaceCard/PlaceCardSkeleton';
import PaginationNav from '../PaginationNav/PaginationNav';

import setUrlRequest from 'utils/setUrlRequest';
import declarationOfNumber from 'utils/declarationOfNumber';
import { BsSliders } from 'react-icons/bs';
import FiltersSelect from '../FiltersSelect/FiltersSelect';

const FilterResult = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { cityId } = useParams();
	const dispatch = useDispatch();
	const initial = useRef(true);

	const totalPlaces = useSelector(selectFilterResultTotal);
	const name = useSelector(selectCityName);
	const searchFilter = useSelector(selectSearchFilter);
	const sort = useSelector(selectFiltersSort);
	const filters = useSelector(selectFilters);
	const { places, loadStatus } = useSelector(selectFilterResult);

	const toggleOfUrl = useCallback(() => {
		const sortBy = searchParams.has('sortBy')
			? searchParams.get('sortBy')
			: 'name';
		const orderBy = searchParams.has('orderBy')
			? searchParams.get('orderBy')
			: 'asc';
		const highRating = searchParams.has('rating');
		const localsChoice = searchParams.has('localsChoise');
		const page = searchParams.has('page') ? searchParams.get('page') : 1;

		if (sortBy !== 'name' || orderBy !== 'asc')
			dispatch(updateSort([sortBy, orderBy]));

		if (highRating) dispatch(toggleSwitch('highRating'));
		if (localsChoice) dispatch(toggleSwitch('localChoice'));

		dispatch(
			updateAllFilters({
				category: searchParams.getAll('category'),
				subcategory: searchParams.getAll('subcategory'),
				district: searchParams.getAll('district'),
				sort: [sortBy, orderBy],
				highRating,
				localsChoice,
				currentPage: +page,
			})
		);
	}, []);

	useEffect(() => {
		toggleOfUrl();
	}, []);

	useEffect(() => {
		if (initial.current) {
			initial.current = false;
			return;
		}
		const request = setUrlRequest(filters, searchFilter);
		dispatch(
			fetchPlaces({
				id: cityId,
				filters: request,
			})
		);
		setSearchParams(request);
	}, [filters, searchFilter]);

	const definePlacesOrder = e => {
		return e.target.value === 'likes' || e.target.value === 'rating'
			? 'desc'
			: 'asc';
	};

	const renderPlace = arr => {
		return arr.map(({ id, ...props }) => {
			return <PlaceCard key={id} cityId={cityId} placeId={id} {...props} />;
		});
	};
	const changeSort = e =>
		dispatch(updateSort([e.target.value, definePlacesOrder(e)]));

	const filteredPlaces = renderPlace(places);
	const isLoading = loadStatus === 'loading' ? true : false;
	const isError = loadStatus === 'error' ? true : false;

	const placesCount = `${name}: найден${
		places.length === 1 ? ' ' : 'о'
	} ${totalPlaces} ${declarationOfNumber(places.length, [
		'место',
		'места',
		'мест',
	])}`;
	return (
		<>
			<div className='places-filter__places filter-result'>
				<div className='filter-result__info'>
					<span className='filter-result__title places-filter__title'>
						{placesCount}
					</span>
					<div className='filter-result__buttons-container'>
						<FiltersSelect changeSort={changeSort} sort={sort[0]} />
						<button
							className='filter-result__button filter-result__button--filter'
							onClick={() => dispatch(toggleMobileVisible())}
						>
							<BsSliders size={24} fill='currentColor' />
						</button>
					</div>
				</div>
				{isError ? (
					<span>ОШИБКА! Не удалось связаться с сервером </span>
				) : (
					<ul className='filter-result__list'>
						{isLoading ? <PlaceCardSkeleton /> : filteredPlaces}
					</ul>
				)}
				<PaginationNav />
			</div>
		</>
	);
};
export default FilterResult;
