import { Outlet } from 'react-router-dom';
import NavTabs from 'components/shared/NavTabs/NavTabs';
import SinglePlaceOverview from 'components/singlePlace/SinglePlaceOverview/SinglePlaceOverview';

const SinglePlacePage = () => {
	return (
		<>
			<SinglePlaceOverview />
			<NavTabs
				tabs={[
					{ name: 'Инфо', path: 'info' },
					{ name: 'Отзывы', path: 'reviews' },
				]}
			/>
			<Outlet />
		</>
	);
};
export default SinglePlacePage;
