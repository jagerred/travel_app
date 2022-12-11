import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { v4 } from 'uuid';
const PlaceCardSkeleton = () => {
	const darkTheme = useSelector(selectDarkTheme);
	const skeletonsArr = () => {
		const arr = [];
		for (let i = 1; i <= 6; i++) {
			arr.push(
				<div
					className={`place-card__skeleton ${darkTheme ? 'dark-card' : ''}`}
					key={v4()}
				>
					<Skeleton animation='wave' height={150} variant='rounded'></Skeleton>
					<div className='place-card__skeleton-text'>
						<Skeleton />
						<Skeleton />
					</div>
				</div>
			);
		}
		return arr;
	};
	return <>{skeletonsArr()}</>;
};
export default PlaceCardSkeleton;
