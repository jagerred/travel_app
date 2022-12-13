import { load } from '@2gis/mapgl';
import { useEffect, memo } from 'react';

const MapWrapper = memo(
	() => {
		return <div id='map-container'></div>;
	},
	() => true
);

const Map = ({ location }) => {
	useEffect(() => {
		let map;
		load()
			.then(mapglAPI => {
				map = new mapglAPI.Map('map-container', {
					center: location,
					zoom: 16,
					//key: process.env.REACT_APP_2GIS_API_KEY,
				});
				const marker = new mapglAPI.Marker(map, {
					coordinates: location,
				});
			})
			.catch(err => console.log(err));

		return () => map && map.destroy();
	}, [location]);

	return (
		<div className='single-place-info__map'>
			<MapWrapper />
		</div>
	);
};

export default Map;
