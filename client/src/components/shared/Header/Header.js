import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { useOnClickOutside } from 'hooks/use-onclick-outside';
import { useRef, useState } from 'react';

import { toggleTheme } from 'redux/slices/themeSlice';
import { toggleModalOpen } from 'redux/slices/authModalSlice';
import { removeUser } from 'redux/slices/userSlice';

import logo from 'pictures/svg/logo.svg';
import logoDark from 'pictures/svg/logo-dark.svg';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSun, FaUserCircle } from 'react-icons/fa';
import { RiMoonFill } from 'react-icons/ri';
import { MdClose } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';

import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectUserInfo } from 'redux/selectors/userSelectors';

const Header = () => {
	const darkTheme = useSelector(selectDarkTheme);

	const [burgerMenu, setBurgerMenu] = useState(false);
	const [userMenu, setUserMenu] = useState(false);

	const { photo } = useSelector(selectUserInfo);

	const dispatch = useDispatch();
	const { isAuth } = useAuth();
	const userMenuRef = useRef();

	useOnClickOutside(userMenuRef, () => toggleUserMenu(), !userMenu);
	const toggleBurgerMenu = () => setBurgerMenu(!burgerMenu);
	const toggleUserMenu = () => setUserMenu(!userMenu);

	const day = <FaSun className='header__icons header__theme' />;
	const night = <RiMoonFill className='header__icons header__theme' />;
	const burger = <GiHamburgerMenu className='header__icons' />;
	const close = <MdClose size={28} className='header__icons' />;

	return (
		<header className='header'>
			<div className='header__container'>
				<Link to='/' tabIndex={0}>
					<img src={darkTheme ? logoDark : logo} alt='' className='logo' />
				</Link>
				<button
					className='button header__burger '
					onClick={() => toggleBurgerMenu()}
				>
					{burgerMenu ? close : burger}
				</button>
				<nav
					className={`navigation header__navigation ${
						burgerMenu ? '' : `header__navigation--hidden`
					}`}
				>
					{isAuth ? (
						<div className={isAuth ? 'header__mobile-nav' : 'hidden'}>
							<div
								className='header__profile-link'
								onClick={() => toggleUserMenu()}
								onKeyDown={e => {
									if (e.code === 'Enter') toggleUserMenu();
								}}
								tabIndex={0}
							>
								{photo !== '' ? (
									<img src={`/${photo}`} alt='' className='image' />
								) : null}
								<FaUserCircle className='header__profile-icon' />
							</div>
							<div
								ref={userMenuRef}
								className={`header__menu ${
									!userMenu ? 'header__menu--hidden' : ''
								}
								${darkTheme ? 'header__menu--dark' : ''}`}
							>
								<Link
									to='profile/cities'
									className={`link button header__button`}
									onClick={() => toggleUserMenu()}
								>
									<FaUserCircle className='header__icons' />
									Профиль
								</Link>
								<button
									className='button header__button header__button--logout'
									onClick={() => dispatch(removeUser())}
								>
									<BiExit className='header__icons' /> Выйти
								</button>
							</div>
						</div>
					) : (
						<button
							className='button header__button header__button--auth'
							onClick={() => dispatch(toggleModalOpen())}
						>
							Войти
						</button>
					)}
					<button
						tabIndex={0}
						className='button header__button'
						onClick={() => dispatch(toggleTheme())}
					>
						{darkTheme ? night : day}
					</button>
				</nav>
			</div>
		</header>
	);
};
export default Header;
