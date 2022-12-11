import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/use-auth';
import { useState } from 'react';
import useHandlePlace from 'hooks/useHandlePlace';

import { useParams } from 'react-router-dom';
import { toggleModalOpen } from 'redux/slices/authModalSlice';
import { fetchSinglePlace } from 'redux/slices/placeSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 } from 'uuid';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import {
	selectPlaceData,
	selectPlaceLoadstatus,
} from 'redux/selectors/placeSelectors';
import { selectUserCities } from 'redux/selectors/userSelectors';
import { checkCurrentCity } from 'utils/placeUtils';
import { isItemInArr } from 'utils/placeUtils';

import { Skeleton } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import { HiShare } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';

const SinglePlaceOverview = () => {
	const [descriptionHidden, setDescriptionHidden] = useState(true);
	const [copyStatus, setCopyStatus] = useState(false);
	const { cityId, placeId } = useParams();
	const dispatch = useDispatch();
	const { isAuth } = useAuth();
	const {
		name,
		address,
		description,
		photos,
		district,
		category,
		likes,
		reviews,
	} = useSelector(selectPlaceData);
	const darkTheme = useSelector(selectDarkTheme);
	const loadStatus = useSelector(selectPlaceLoadstatus);
	const cities = useSelector(selectUserCities);
	const currentUrl = window.location.href;

	useEffect(() => {
		dispatch(fetchSinglePlace({ cityId, placeId }));
	}, []);

	useEffect(() => {
		let copyTimeout;
		if (copyStatus) {
			copyTimeout = setTimeout(() => {
				setCopyStatus(false);
			}, 3000);
		}
		return () => clearTimeout(copyTimeout);
	}, [copyStatus]);

	const placeObj = {
		id: placeId,
		name,
		photos,
		address,
		district,
		category,
	};

	const currentCity = checkCurrentCity(cities, cityId);

	const isLiked = isItemInArr(cities, cityId)
		? isItemInArr(currentCity.places, placeId) ||
		  isItemInArr(currentCity.visited, placeId)
		: false;

	const { handlePlace, erasePlace } = useHandlePlace({
		cities,
		cityId,
		placeObj,
		currentCity,
		likes,
		isItemInArr,
	});

	const checkAuth = func => (isAuth ? func() : dispatch(toggleModalOpen()));

	const themeDark = darkTheme ? 'single-place-overview__container--dark' : '';
	const isLoading = loadStatus === 'loading';
	return (
		<>
			<div className={`single-place-overview__container ${themeDark} `}>
				<div className='single-place-overview__img'>
					{loadStatus === 'loading' ? (
						<Skeleton variant='rounded' width={800} height={700} />
					) : (
						<img src={photos} alt={`Фото места: ${name}`} className='image' />
					)}
				</div>
				<div className='single-place-overview__info'>
					<div className='single-place-overview__title-container'>
						<h2 className='single-place-overview__name'>
							{isLoading ? <Skeleton /> : name}
						</h2>
						<span className='single-place-overview__address'>
							{isLoading ? (
								<Skeleton height={20} width={150} />
							) : (
								`${address}, р-н ${district}`
							)}
						</span>
					</div>
					<span className='single-place-overview__description'>
						{isLoading
							? [
									<Skeleton key={v4()} />,
									<Skeleton key={v4()} />,
									<Skeleton key={v4()} />,
									<Skeleton key={v4()} />,
									<Skeleton key={v4()} />,
									<Skeleton key={v4()} />,
							  ]
							: `${description.slice(0, 264)}${
									descriptionHidden && description.length >= 264
										? '...'
										: `${description.slice(264)}`
							  } `}
						{description.length >= 264 ? (
							<span
								className='single-place-overview__more'
								onClick={() => setDescriptionHidden(!descriptionHidden)}
							>
								{descriptionHidden ? 'Показать еще' : 'Скрыть'}
							</span>
						) : null}
					</span>
					<div className='single-place-overview__buttons'>
						{isLiked ? (
							<button
								className='button single-place-overview__button single-place-overview__button--delete'
								onClick={() => checkAuth(erasePlace)}
							>
								Удалить
							</button>
						) : (
							<button
								className='button single-place-overview__button single-place-overview__button--add'
								onClick={() => checkAuth(handlePlace)}
							>
								Добавить
							</button>
						)}
						<CopyToClipboard
							text={currentUrl}
							onCopy={() => {
								setCopyStatus(!copyStatus);
							}}
						>
							<button className='button single-place-overview__button single-place-overview__button--share'>
								{copyStatus ? (
									<MdDone className='single-place-overview__share-icon' />
								) : (
									<HiShare className='single-place-overview__share-icon' />
								)}
							</button>
						</CopyToClipboard>
						<AnimatePresence>
							{copyStatus ? (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<span className='single-place-overview__copy-feedback'>
										Скопировано
									</span>
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</>
	);
};
export default SinglePlaceOverview;
