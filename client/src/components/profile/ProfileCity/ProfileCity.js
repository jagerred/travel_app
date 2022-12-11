import { Link } from 'react-router-dom';

import { MdLocationPin } from 'react-icons/md';
const ProfileCity = ({ id, name, photos, placesLength, darkTheme }) => {
	const { places, visited } = placesLength;
	const totalPlaces = places + visited;
	const completionPersent =
		totalPlaces === 0 ? 0 : `${Math.round((visited / totalPlaces) * 100)}%`;

	return (
		<>
			<li className={`profile-city__item ${darkTheme ? 'dark-card' : ''}`}>
				<Link to={`/profile/${id}`} className='link profile-city__container'>
					<div className='profile-city__main'>
						<div className='profile-city__img'>
							<img src={photos} alt='' className='image' />
						</div>
						<div className='profile-city__info'>
							<h3 className='profile-city__title'>{name}</h3>
							<div className='profile-city__stats'>
								<div className='profile-city__stat'>
									<span className='stat-text'>
										<MdLocationPin />
										{totalPlaces}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='profile-city__visited'>
						<div className='profile-city__progress'>
							<span className='profile-city__progress-title'>
								Мест посещено
							</span>
							<div className='profile-city__bar'>
								<div
									className='profile-city__bar-status'
									style={{ width: completionPersent }}
								></div>
							</div>
						</div>
						<div className='profile-city__completed-slash'>{`${visited}/${totalPlaces}`}</div>
					</div>
				</Link>
			</li>
		</>
	);
};
export default ProfileCity;
