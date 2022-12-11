import { useSelector } from 'react-redux';

import ProfileCity from 'components/profile/ProfileCity/ProfileCity';
import RedirectLink from 'components/shared/RedirectLink/RedirectLink';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectUserCities } from 'redux/selectors/userSelectors';
const ProfileCities = () => {
	const cities = useSelector(selectUserCities);
	const darkTheme = useSelector(selectDarkTheme);

	const renderCities = () => {
		return cities.map(({ id, places, visited, ...props }) => {
			return (
				<ProfileCity
					key={id}
					id={id}
					placesLength={{ places: places.length, visited: visited.length }}
					{...props}
					darkTheme={darkTheme}
				/>
			);
		});
	};

	if (cities.length === 0)
		return (
			<RedirectLink
				title={'добавленных городов'}
				buttonText={'Найти города'}
				link={'/'}
			/>
		);

	return (
		<>
			<div className='profile-cities__container'>
				<ul className='list profile-cities__list'>{renderCities()}</ul>
			</div>
		</>
	);
};
export default ProfileCities;
