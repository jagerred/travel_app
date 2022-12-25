import { useDispatch, useSelector } from 'react-redux';
import {
	fetchSubcategories,
	fetchAllSubcategories,
	removeSubcategory,
} from 'redux/slices/subcategoriesSlice';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	fetchPlaceCategories,
	toggleCategory,
} from 'redux/slices/placeCategoriesSlice';

import { v4 } from 'uuid';
import PlaceCategoriesSkeleton from './PlaceCategoriesSkeleton';
import {
	addFilter,
	clearFilter,
	deleteFilter,
} from 'redux/slices/filtersSlice';
import { selectPlaceCategoties } from 'redux/selectors/placeSelectors';
import { chooseCategoryIcon } from 'utils/chooseCategoryIcon';
const PlaceCategories = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const { categories, loadStatus } = useSelector(selectPlaceCategoties);

	useEffect(() => {
		dispatch(fetchPlaceCategories());
	}, []);

	useEffect(() => {
		if (loadStatus !== 'idle') return;
		if (searchParams.has('category')) {
			const categoriesArr = searchParams.getAll('category');
			categoriesArr.forEach(item => {
				dispatch(toggleCategory(item));
			});
			const subcategoriesFetchArr = categoriesArr
				.map(i => `category=${i}&`)
				.join('')
				.slice(0, -1);
			dispatch(fetchAllSubcategories(subcategoriesFetchArr));
		}
	}, [loadStatus]);

	const addActive = category => {
		dispatch(fetchSubcategories(category));
		dispatch(addFilter({ type: 'category', filter: category }));
	};
	const removeActive = category => {
		dispatch(removeSubcategory(category));
		dispatch(deleteFilter({ type: 'category', filter: category }));
		dispatch(clearFilter('subcategory'));
	};
	const categoriesRender = categories => {
		return categories.map(item => {
			const activeClass = item.isActive ? 'place-categories__item--active' : '';
			return (
				<li key={v4()}>
					<button
						className={`place-categories__item ${activeClass}`}
						tabIndex='0'
						onClick={() => {
							if (activeClass === '') {
								addActive(item.category);
							} else {
								removeActive(item.category);
							}
							dispatch(toggleCategory(item.category));
						}}
					>
						{chooseCategoryIcon(item.category)}
						<span className='place-categories__name'>{item.name}</span>
					</button>
				</li>
			);
		});
	};
	const slides = categoriesRender(categories);
	return (
		<>
			<div className='place-categories__container'>
				<ul className='list place-categories__list'>
					{loadStatus === 'loading' ? <PlaceCategoriesSkeleton /> : slides}
				</ul>
			</div>
		</>
	);
};
export default PlaceCategories;
