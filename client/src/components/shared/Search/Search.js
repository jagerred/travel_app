import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import {
	fetchCityInfo,
	searchRequest,
	updateFilter,
} from 'redux/slices/searchSlice';
import { fetchCities, setIsSearch } from 'redux/slices/citiesSlice';
import searchIcon from 'pictures/svg/search.svg';

import { Skeleton } from '@mui/material';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectSearch } from 'redux/selectors/searchSelectors';
import { useState } from 'react';

const Search = ({ isMain, searchPlaceholder }) => {
	const [value, setValue] = useState('');
	const [opened, setOpened] = useState(false);
	const { cityId } = useParams();
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const resultsRef = useRef(null);

	const { cityInfo, searchResult, searchFilter, loadStatus } =
		useSelector(selectSearch);

	const darkTheme = useSelector(selectDarkTheme);

	useEffect(() => {
		if (!isMain) dispatch(fetchCityInfo(cityId));
		if (searchFilter !== '') dispatch(updateFilter(''));
	}, []);

	useEffect(() => {
		if (value === '') return;
		isMain
			? dispatch(searchRequest(`${value}`))
			: dispatch(searchRequest(`${cityId}/place/${value}`));
	}, [value]);

	useEffect(() => {
		if (!opened) return;
		const handleClick = e => {
			if (!resultsRef.current) return;
			if (
				!resultsRef.current.contains(e.target) &&
				!inputRef.current.contains(e.target)
			) {
				setOpened(false);
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [opened]);

	const renderSearchResult = () => {
		return value === ''
			? null
			: searchResult.map(i => {
					return (
						<li key={v4()} className='search__result-item'>
							<Link
								to={isMain ? `/${i._id}/places` : `${i.id}/info`}
								className='link search__link'
								onClick={() => setValue('')}
							></Link>
							{i.name}
						</li>
					);
			  });
	};

	const addSearchFilter = e => {
		e.preventDefault();
		if (isMain) {
			dispatch(fetchCities(`?search=${value}`));
			dispatch(setIsSearch(value === '' ? false : true));
			return;
		}
		dispatch(updateFilter(value));
	};

	const cityImage = isMain
		? 'https://s1.1zoom.ru/big3/804/Russia_Moscow_Rivers_478099.jpg'
		: cityInfo.photos;
	const cityName = isMain ? '' : cityInfo.name;

	return (
		<>
			<section className='search'>
				<div className='search__container'>
					<div className={`search__city ${darkTheme ? 'dark-card' : ''}`}>
						<h2 className='search__title'>
							{loadStatus === 'loading' ? <Skeleton width={300} /> : cityName}
						</h2>
						{loadStatus === 'loading' ? null : (
							<img src={cityImage} alt='City view' className='image' />
						)}
					</div>
					<form action='#' className='search__form'>
						<input
							ref={inputRef}
							type='text'
							className={`input search__input`}
							placeholder={searchPlaceholder}
							value={value}
							onInput={e => setValue(e.target.value)}
							onFocus={() => setOpened(true)}
						/>
						<button
							className='button search__button'
							onClick={e => addSearchFilter(e)}
						>
							<img
								className='search__icon'
								alt='search icon'
								src={searchIcon}
							/>
						</button>

						{opened ? (
							<ul ref={resultsRef} className='list search__result-list'>
								{renderSearchResult()}
							</ul>
						) : null}
					</form>
				</div>
			</section>
		</>
	);
};
export default Search;
