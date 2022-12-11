import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postReorderedList } from 'redux/slices/userSlice';
import ProfileCard from 'components/profile/ProfileCard/ProfileCard';
import { Reorder } from 'framer-motion';
import RedirectLink from 'components/shared/RedirectLink/RedirectLink';
import { selectUserCities } from 'redux/selectors/userSelectors';

const ProfileCards = () => {
	const { cityId } = useParams();
	const dispatch = useDispatch();
	const cities = useSelector(selectUserCities);
	const currentCity = cities.find(i => i.id === cityId);

	const renderPlaces = (subArray, visited) => {
		return currentCity[subArray].map(item => {
			return <ProfileCard key={item.id} item={item} visited={visited} />;
		});
	};

	const myPlaces = renderPlaces('places', false);
	const visitedPlaces = renderPlaces('visited', true);
	const changePlacesOrder = items =>
		dispatch(
			postReorderedList({ cityId, changedList: items, type: 'reorderPlaces' })
		);

	const changeVisitedOrder = items =>
		dispatch(
			postReorderedList({ cityId, changedList: items, type: 'reorderVisited' })
		);

	if (myPlaces.length === 0 && visitedPlaces.length === 0)
		return (
			<RedirectLink
				title={'добавленных мест'}
				buttonText={'Найти места'}
				link={`/${cityId}/places`}
			/>
		);
	return (
		<>
			<Reorder.Group
				axys='y'
				values={currentCity.places}
				className='profile-cards__list'
				onReorder={changePlacesOrder}
			>
				{myPlaces}
			</Reorder.Group>
			{currentCity.visited.length === 0 ? null : (
				<h3 className='profile-cards__visited-title'>Посещено</h3>
			)}
			<Reorder.Group
				axys='y'
				values={currentCity.visited}
				className='profile-cards__list'
				onReorder={changeVisitedOrder}
			>
				{visitedPlaces}
			</Reorder.Group>
		</>
	);
};
export default ProfileCards;
