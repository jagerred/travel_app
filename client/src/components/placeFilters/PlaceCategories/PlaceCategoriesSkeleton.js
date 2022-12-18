import { Skeleton } from '@mui/material';

const PlaceCategoriesSkeleton = () => {
	const skeleton = (
		<div className='place-categories__skeleton'>
			<Skeleton
				animation='wave'
				width={35}
				height={35}
				variant='circular'
			></Skeleton>
			<Skeleton width={60} />
		</div>
	);
	return (
		<>
			{skeleton}
			{skeleton}
			{skeleton}
			{skeleton}
			{skeleton}
		</>
	);
};
export default PlaceCategoriesSkeleton;
