import ProfileMain from 'components/profile/ProfileMain/ProfileMain';
import { Outlet } from 'react-router-dom';
import NavTabs from 'components/shared/NavTabs/NavTabs';
import { useAuth } from 'hooks/use-auth';
const ProfilePage = () => {
	const { isAuth } = useAuth();
	if (!isAuth) return <span className='profile-page__auth'>Не зареган</span>;
	return (
		<>
			<div className='profile-page'>
				<ProfileMain />
				<NavTabs tabs={[{ name: 'Мои города', path: 'cities' }]} />
				<Outlet />
			</div>
		</>
	);
};
export default ProfilePage;
