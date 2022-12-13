import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

import { uploadImage } from 'redux/slices/userSlice';
import { FaUserCircle } from 'react-icons/fa';
import declarationOfNumber from 'utils/declarationOfNumber';
import { selectUserInfo } from 'redux/selectors/userSelectors';

const ProfileMain = () => {
	const dispatch = useDispatch();
	const { uid, name, photo, cities } = useSelector(selectUserInfo);
	const fileInputRef = useRef(null);

	const sendFile = img => {
		const dataForm = new FormData();
		dataForm.append('avatar', img);
		dispatch(uploadImage({ dataForm, uid }));
	};

	const handleInput = () => {
		fileInputRef.current.click();
	};

	const totalPlaces = cities.reduce(
		(sum, i) => sum + i.places.length + i.visited.length,
		0
	);

	return (
		<div className='profile-page__main profile-main__container'>
			<div className='profile-main__photo'>
				{photo !== '' ? (
					<img src={`/${photo}`} alt='' className='image' />
				) : null}
				<FaUserCircle className='profile-main__profile-icon' />

				<button className='button profile-main__button' onClick={handleInput}>
					Изменить фото
				</button>
			</div>
			<div className='profile-main__info'>
				<span className='profile-main__name'>{name}</span>
				<div className='profile-main__profile-stats profile-stats'>
					<ul className='list profile-stats__list'>
						<li className='profile-stats__item'>
							<span className='profile-stats__count'>{cities.length}</span>
							<span className='profile-stats__name'>
								{declarationOfNumber(cities.length, [
									'город',
									'города',
									'городов',
								])}
							</span>
						</li>
						<li className='profile-stats__item'>
							<span className='profile-stats__count'>{totalPlaces}</span>
							<span className='profile-stats__name'>
								{declarationOfNumber(totalPlaces, ['место', 'места', 'мест'])}
							</span>
						</li>
					</ul>
					<input
						className='visually-hidden'
						type='file'
						ref={fileInputRef}
						onChange={e => sendFile(e.target.files[0])}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileMain;
