import { Skeleton } from '@mui/material';

const PlaceCategoriesSkeleton = () => {
	return (
		<>
			<div className="place-categories__skeleton">
				<Skeleton
					animation="wave"
					width={35}
					height={35}
					variant="circular"
				></Skeleton>
				<Skeleton width={60} />
			</div>
			<div className="place-categories__skeleton">
				<Skeleton
					animation="wave"
					width={35}
					height={35}
					variant="circular"
				></Skeleton>
				<Skeleton width={60} />
			</div>
			<div className="place-categories__skeleton">
				<Skeleton
					animation="wave"
					width={35}
					height={35}
					variant="circular"
				></Skeleton>
				<Skeleton width={60} />
			</div>
			<div className="place-categories__skeleton">
				<Skeleton
					animation="wave"
					width={35}
					height={35}
					variant="circular"
				></Skeleton>
				<Skeleton width={60} />
			</div>
			<div className="place-categories__skeleton">
				<Skeleton
					animation="wave"
					width={35}
					height={35}
					variant="circular"
				></Skeleton>
				<Skeleton width={60} />
			</div>
		</>
	);
};
export default PlaceCategoriesSkeleton;
