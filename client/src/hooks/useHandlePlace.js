import { useDispatch } from 'react-redux';
import { putLike } from '../redux/slices/filterResultSlice';
import { deletePlace, postCity, postPlace } from '../redux/slices/userSlice';
import { isItemInArr } from 'utils/placeUtils';

const useHandlePlace = ({ cities, cityId, placeObj, currentCity, likes }) => {
	const placeId = placeObj.id;
	const dispatch = useDispatch();
	const handlePlace = () => {
		if (!isItemInArr(cities, cityId)) {
			dispatch(postCity({ cityId, placeObj }));
			dispatch(
				putLike({
					cityId,
					placeId,
					likeCount: { likes: +likes + 1 },
				})
			);
		} else {
			dispatch(postPlace({ placeObj, cityId, type: 'places' }));
			dispatch(
				putLike({
					cityId,
					placeId,
					likeCount: { likes: +likes + 1 },
				})
			);
		}
	};
	const erasePlace = () => {
		console.log(currentCity);
		const deleteType = isItemInArr(currentCity.places, placeId)
			? 'deletePlace'
			: 'deleteVisitedPlace';
		dispatch(
			deletePlace({
				place: {
					id: placeId,
				},
				cityId,
				type: `${deleteType}`,
				both: true,
				placeObj: null,
			})
		);

		dispatch(putLike({ cityId, placeId, likeCount: { likes: +likes - 1 } }));
	};
	return { handlePlace, erasePlace };
};
export default useHandlePlace;
