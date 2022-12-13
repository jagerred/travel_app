import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { MdLocationPin } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { Reorder } from 'framer-motion';
import { deletePlace, postPlace } from 'redux/slices/userSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';

const ProfileCard = ({ item, visited }) => {
	const dispatch = useDispatch();
	const { cityId } = useParams();

	const darkTheme = useSelector(selectDarkTheme);
	const themeClass = darkTheme ? 'dark-card' : '';
	const dndFix = event => {
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	};
	const eraseVistedPlace = placeId => {
		dispatch(
			deletePlace({
				place: {
					id: placeId,
				},
				cityId,
				type: 'deleteVisitedPlace',
				both: true,
				placeObj: null,
			})
		);
	};
	const erasePlace = placeId => {
		dispatch(
			deletePlace({
				place: {
					id: placeId,
				},
				cityId,
				type: 'deletePlace',
				both: true,
				placeObj: null,
			})
		);
	};
	const addVisited = () => {
		dispatch(
			deletePlace({
				cityId,
				type: 'deletePlace',
				place: {
					id: item.id,
				},
				both: false,
				placeObj: item,
			})
		);

		dispatch(
			postPlace({
				cityId,
				placeObj: item,
				type: 'visited',
				isChangingStatus: true,
			})
		);
	};
	const addNotVisited = () => {
		dispatch(
			deletePlace({
				cityId,
				type: 'deleteVisitedPlace',
				place: {
					id: item.id,
				},
				both: false,
				placeObj: item,
			})
		);

		dispatch(
			postPlace({
				cityId,
				placeObj: item,
				type: 'places',
				isChangingStatus: true,
			})
		);
	};

	let drag = false;

	return (
		<>
			<Reorder.Item
				whileDrag={{
					scale: 1.05,
				}}
				key={item.id}
				value={item}
				className={`link profile-cards__item ${themeClass} ${
					visited === true ? 'profile-cards__item--visited' : ''
				}`}
			>
				<Link
					to={`/${cityId}/places/${item.id}/info`}
					className='profile-cards__link'
					onMouseDown={e => {
						drag = false;
						dndFix(e);
					}}
					onMouseMove={e => {
						drag = true;
					}}
					onClick={e => {
						if (drag) e.preventDefault();
					}}
				/>
				<div className='profile-cards__img'>
					<img src={item.photos} alt={item.name} className='image' />
				</div>
				<div className='profile-cards__text'>
					<span className='profile-cards__name'>
						{item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}
					</span>
					<span className='profile-cards__place'>
						<MdLocationPin
							size='14'
							fill='currentColor'
							className='profile-cards__icon'
						/>
						{item.address}
					</span>
				</div>
				<button
					className='profile-cards__button profile-cards__button--add'
					onClick={() => {
						visited ? addNotVisited() : addVisited();
					}}
				>
					{visited ? (
						<MdClose className='profile-cards__button-icon' />
					) : (
						<FiCheck className='profile-cards__button-icon' />
					)}
				</button>
				<button
					className='profile-cards__button profile-cards__button--delete'
					onClick={() =>
						visited ? eraseVistedPlace(item.id) : erasePlace(item.id)
					}
				>
					<MdDelete className='profile-cards__button-icon' />
				</button>
			</Reorder.Item>
		</>
	);
};
export default ProfileCard;
