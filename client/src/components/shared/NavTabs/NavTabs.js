import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';

const NavTabs = ({ tabs }) => {
	const location = useLocation();
	const activeLocation = location.pathname.split('/').pop();
	const [activeTab, setActiveTab] = useState(activeLocation);
	const renderTabs = () => {
		return tabs.map(i => {
			return (
				<li
					key={v4()}
					className='nav-tabs__item'
					onClick={() => {
						setActiveTab(i.path);
					}}
				>
					<Link to={i.path} className='link nav-tabs__link'>
						{i.name}
						<span
							className={`nav-tabs__underline ${
								activeTab === i.path ? `nav-tabs__underline--active` : ''
							}`}
						></span>
					</Link>
				</li>
			);
		});
	};
	return (
		<div className='nav-tabs__container'>
			<ul className='list nav-tabs__list'>{renderTabs()}</ul>
		</div>
	);
};
export default NavTabs;
