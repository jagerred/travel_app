import { CircularProgress } from '@mui/material';

const LazyLoader = () => {
	return (
		<div className='lazy-loader__container'>
			<CircularProgress color='inherit' size={50} />
		</div>
	);
};

export default LazyLoader;
