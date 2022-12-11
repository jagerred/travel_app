import { Link } from 'react-router-dom';
const RedirectLink = ({ title, buttonText, link }) => {
	return (
		<>
			<div className="redirect-main__container">
				<span className="redirect-main__title">
					{`У Вас еще нет ${title}   :(`}
				</span>
				<Link to={link} className=" link redirect-main__link">
					{buttonText}
				</Link>
			</div>
		</>
	);
};
export default RedirectLink;
