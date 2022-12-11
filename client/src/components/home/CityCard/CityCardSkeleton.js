import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';

const CityCardSkeleton = () => {
	const darkTheme = useSelector(selectDarkTheme);
	return (
		<>
			<div className={`cities__skeleton ${darkTheme ? 'dark-card' : ''}`}>
				<Skeleton
					variant='circular'
					width={46}
					height={46}
					className='cities__button'
				/>
				<div className='cities__skeleton-text'>
					<Skeleton variant='rounded' height={20} />
					<Skeleton width={140} />
				</div>
			</div>
		</>
	);
};
export default CityCardSkeleton;
