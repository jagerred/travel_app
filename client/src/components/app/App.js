import './App.scss';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import Header from 'components/shared/Header/Header';
import UserModal from 'components/user/UserModal/UserModal';
import ErrorPopup from 'components/shared/ErrorPopup/ErrorPopup';
import LazyLoader from 'components/shared/LazyLoader/LazyLoader';
import { suspenseComponent } from 'utils/suspenseComponent';
//import MainPage from 'pages/MainPage/MainPage';
//import CityPage from 'pages/CityPage/CityPage';
//import SinglePlacePage from 'pages/SinglePlacePage/SinglePlacePage';
//import ProfilePage from 'pages/ProfilePage/ProfilePage';
//import ProfileCities from 'components/profile/ProfileCities/ProfileCities';
//import Page404 from 'pages/Page404/Page404';
//import ProfileCards from 'components/profile/ProfileCards/ProfileCards';
//import SinglePlaceReviews from 'components/singlePlace/SinglePlaceReviews/SinglePlaceReviews';
//import SinglePlaceInfo from 'components/singlePlace/SinglePlaceInfo/SinglePlaceInfo';

const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const CityPage = lazy(() => import('pages/CityPage/CityPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const ProfileCities = lazy(() =>
	import('components/profile/ProfileCities/ProfileCities')
);
const ProfileCards = lazy(() =>
	import('components/profile/ProfileCards/ProfileCards')
);
const SinglePlacePage = lazy(() =>
	import('pages/SinglePlacePage/SinglePlacePage')
);
const SinglePlaceReviews = lazy(() =>
	import('components/singlePlace/SinglePlaceReviews/SinglePlaceReviews')
);
const SinglePlaceInfo = lazy(() =>
	import('components/singlePlace/SinglePlaceInfo/SinglePlaceInfo')
);
const Page404 = lazy(() => import('pages/Page404/Page404'));

function App() {
	const darkTheme = useSelector(selectDarkTheme);

	return (
		<>
			<div className={`wrapper ${darkTheme ? `dark-theme` : ''}`}>
				<div className='container'>
					<Header />
					<Routes>
						<Route path='/' element={suspenseComponent(<MainPage />)} />
						<Route
							path=':cityId/places'
							element={suspenseComponent(<CityPage />)}
						/>
						<Route
							path=':cityId/places/:placeId'
							element={suspenseComponent(<SinglePlacePage />)}
						>
							<Route
								path='reviews'
								element={suspenseComponent(<SinglePlaceReviews />)}
							/>
							<Route
								path='info'
								element={suspenseComponent(<SinglePlaceInfo />)}
							/>
						</Route>
						<Route path='profile' element={suspenseComponent(<ProfilePage />)}>
							<Route
								path='cities'
								element={suspenseComponent(<ProfileCities />)}
							/>
							<Route
								path=':cityId'
								element={suspenseComponent(<ProfileCards />)}
							/>
						</Route>
						<Route path='*' element={suspenseComponent(<Page404 />)} />
					</Routes>
					<UserModal />
					<ErrorPopup />
				</div>
			</div>
		</>
	);
}

export default App;
