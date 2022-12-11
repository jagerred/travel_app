import { useState } from 'react';
import { useSelector } from 'react-redux';
import checkPlaceOpen from 'utils/checkPlaceOpen';
import Map from 'components/mapGis/Map/Map';
import { v4 } from 'uuid';
import { FaTelegramPlane, FaFacebookF } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { BiWorld } from 'react-icons/bi';
import { BsWhatsapp, BsTwitter, BsYoutube } from 'react-icons/bs';
import { MdLocalPhone, MdKeyboardArrowDown } from 'react-icons/md';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectPlaceDataInfo } from 'redux/selectors/placeSelectors';

const SinglePlaceInfo = () => {
	const [schedule, setSchedule] = useState(false);
	const darkTheme = useSelector(selectDarkTheme);
	const { phone, social, website, worktime, location } =
		useSelector(selectPlaceDataInfo);

	const isNoWorkTime = worktime.length !== 0 ? true : false;
	const isAroudTheClock =
		worktime.length === 1 && worktime[0].name === 'Круглосуточно'
			? true
			: false;
	const { isOpen, startTime, endTime, nextDayStart } = checkPlaceOpen(worktime);

	const renderPhone = () => {
		return phone.length === 0 ? (
			<span className='single-place-info__no-time'>Контакты не указаны</span>
		) : (
			phone.map(i => {
				return (
					<li className='single-place-info__phone-item' key={v4()}>
						<span className='single-place-info__phone-name'>{i.name}</span>
						<div className='single-place-info__link'>
							<a
								href={`tel: ${i.phone}`}
								className='link single-place-info__phone-number'
							>
								{i.phone}
							</a>
						</div>
					</li>
				);
			})
		);
	};

	const renderWorkTime = () => {
		return isAroudTheClock ? (
			<span className='single-place-info__work-status'>Круглосуточно</span>
		) : isNoWorkTime ? (
			<>
				<span
					className={`single-place-info__work-status ${
						isOpen ? '' : 'single-place-info__work-status--closed'
					}`}
				>
					{isOpen ? 'Открыто' : `Закрыто до ${nextDayStart}`}
				</span>
				<span className='single-place-info__time'>
					{isOpen ? `с ${startTime} до ${endTime}` : ''}
				</span>
				<button
					className='button single-place-info__more-button'
					onClick={toggleSchedule}
				>
					График <MdKeyboardArrowDown size={18} />
				</button>
			</>
		) : (
			<span className='single-place-info__no-time'>
				График работы не указан
			</span>
		);
	};

	const renderWebSite = () => {
		return website.length !== 0 ? (
			<div className='single-place-info__link'>
				<a href={website} className='link single-place-info__site'>
					{website}
				</a>
			</div>
		) : (
			<span className='single-place-info__no-time'>Сайт не указан</span>
		);
	};
	const pickSocialIcon = type => {
		switch (type) {
			case 'tg':
				return <FaTelegramPlane className='single-place-info__social-icon' />;
			case 'fb':
				return <FaFacebookF className='single-place-info__social-icon' />;
			case 'vk':
				return (
					<svg
						className='single-place-info__social-icon'
						fill='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='m23.456 5.784c-.27.849-.634 1.588-1.09 2.259l.019-.03q-.672 1.12-1.605 2.588-.8 1.159-.847 1.2c-.138.173-.234.385-.267.618l-.001.007c.027.212.125.397.268.535l.4.446q3.21 3.299 3.611 4.548c.035.092.055.198.055.309 0 .194-.062.373-.167.52l.002-.003c-.176.181-.422.293-.694.293-.03 0-.061-.001-.09-.004h.004-2.631c-.001 0-.003 0-.005 0-.337 0-.647-.118-.89-.314l.003.002c-.354-.291-.669-.606-.951-.948l-.009-.012q-.691-.781-1.226-1.315-1.782-1.694-2.63-1.694c-.021-.002-.045-.003-.07-.003-.165 0-.319.051-.446.138l.003-.002c-.104.13-.167.298-.167.479 0 .036.002.07.007.105v-.004c-.027.314-.043.679-.043 1.048 0 .119.002.237.005.355v-.017 1.159c.01.047.016.101.016.156 0 .242-.11.458-.282.601l-.001.001c-.387.177-.839.281-1.316.281-.102 0-.202-.005-.301-.014l.013.001c-1.574-.03-3.034-.491-4.275-1.268l.035.02c-1.511-.918-2.763-2.113-3.717-3.525l-.027-.042c-.906-1.202-1.751-2.56-2.471-3.992l-.07-.154c-.421-.802-.857-1.788-1.233-2.802l-.06-.185c-.153-.456-.264-.986-.31-1.535l-.002-.025q0-.758.892-.758h2.63c.024-.002.052-.003.081-.003.248 0 .477.085.658.228l-.002-.002c.2.219.348.488.421.788l.003.012c.484 1.367.997 2.515 1.587 3.615l-.067-.137c.482.97 1.015 1.805 1.623 2.576l-.023-.031q.8.982 1.248.982c.009.001.02.001.032.001.148 0 .277-.08.347-.2l.001-.002c.074-.19.117-.411.117-.641 0-.049-.002-.098-.006-.146v.006-3.879c-.021-.457-.133-.884-.32-1.267l.008.019c-.124-.264-.273-.492-.45-.695l.003.004c-.164-.164-.276-.379-.311-.619l-.001-.006c0-.17.078-.323.2-.423l.001-.001c.121-.111.283-.178.46-.178h.008 4.146c.022-.003.047-.004.073-.004.195 0 .37.088.486.226l.001.001c.103.188.164.413.164.651 0 .038-.002.075-.005.112v-.005 5.173c-.002.024-.003.052-.003.08 0 .184.051.357.139.504l-.002-.004c.073.108.195.178.333.178h.001c.176-.012.336-.07.471-.162l-.003.002c.272-.187.506-.4.709-.641l.004-.005c.607-.686 1.167-1.444 1.655-2.25l.039-.07c.344-.57.716-1.272 1.053-1.993l.062-.147.446-.892c.155-.446.571-.76 1.06-.76.019 0 .038 0 .057.001h-.003 2.631q1.066 0 .8.981z' />
					</svg>
				);
			case 'wu':
				return <BsWhatsapp className='single-place-info__social-icon' />;
			case 'tw':
				return <BsTwitter className='single-place-info__social-icon' />;
			case 'yt':
				return <BsYoutube className='single-place-info__social-icon' />;
		}
	};
	const renderSocial = () => {
		return social.length === 0 ? null : (
			<ul className='list single-place-info__social-list'>
				{social.map(({ type, link }) => {
					return (
						<li className='single-place-info__social-item' key={v4()}>
							<a
								href={link}
								className='link single-place-info__link link single-place-info__link--social'
							>
								{pickSocialIcon(type)}
							</a>
						</li>
					);
				})}
			</ul>
		);
	};
	const toggleSchedule = () => {
		setSchedule(!schedule);
	};

	return (
		<>
			<div className='single-place-info__container'>
				<div
					className={`single-place-info__items ${darkTheme ? 'dark-card' : ''}`}
				>
					<MdLocalPhone
						className={`single-place-info__icon single-place-info__icon--phoneSingle ${
							darkTheme ? 'dark-icon' : ''
						}`}
					/>
					<div className='single-place-info__contact'>
						<span className='single-place-info__title'>Контакты</span>
						<ul className='list single-place-info__phone-list'>
							{renderPhone()}
						</ul>
					</div>
					<FiClock
						className={`single-place-info__icon ${
							darkTheme ? 'dark-icon' : ''
						}`}
					/>
					<div className='single-place-info__work-time'>
						<span className='single-place-info__title'>Время работы</span>
						{renderWorkTime()}
					</div>
					{schedule && isNoWorkTime ? (
						<ul className='list single-place-info__schedule-list'>
							{worktime.map(i => {
								return (
									<li className='single-place-info__schedule-item'>
										<span className='single-place-info__schedule-text'>
											{i.name}
										</span>
										<span className='single-place-info__schedule-text'>
											| {i.start}-{i.end}
										</span>
									</li>
								);
							})}
						</ul>
					) : null}
					<BiWorld
						className={`single-place-info__icon ${
							darkTheme ? 'dark-icon' : ''
						}`}
					/>{' '}
					{renderWebSite()}
					{renderSocial()}
				</div>
				<Map location={location} />
			</div>
		</>
	);
};
export default SinglePlaceInfo;
