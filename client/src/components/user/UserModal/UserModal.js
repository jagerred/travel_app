import UserForm from '../UserForm/UserForm';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUser } from 'redux/slices/userSlice';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../../../firebase/firebase';
import {
	setAuthError,
	toggleModalLogin,
	toggleModalOpen,
} from '../../../redux/slices/authModalSlice';
import { CircularProgress } from '@mui/material';
const UserModal = () => {
	const dispatch = useDispatch();
	const { isModalOpen, isModalLogin } = useSelector(state => state.authModal);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {}, [isModalOpen]);
	const handleError = err => {
		switch (err) {
			case 'Firebase: Error (auth/email-already-in-use).':
				return 'Email уже зарегистрирован';
			case 'Firebase: Error (auth/user-not-found).':
				return 'Пользователь не найден';
			case 'Firebase: Error (auth/wrong-password).':
				return 'Неверный пароль';
			case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
				return 'Слишком много попыток входа. Повторите позже	';
			default:
				return null;
		}
	};
	const handleLogin = (email, password) => {
		const auth = getAuth(app);
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				setIsLoading(false);
				dispatch(fetchUser(user.uid));
				dispatch(toggleModalOpen());
			})
			.catch(error => {
				setIsLoading(false);
				dispatch(setAuthError(handleError(error.message)));
			});
	};
	const handleSignUp = (email, password, name) => {
		const auth = getAuth(app);
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				setIsLoading(false);
				dispatch(
					addUser({
						email: user.email,
						uid: user.uid,
						name,
						cities: [],
						photo: '',
					})
				);
				dispatch(setAuthError(null));
				dispatch(toggleModalLogin());
			})
			.catch(error => {
				setIsLoading(false);
				dispatch(setAuthError(handleError(error.message)));
			});
	};
	return (
		<div
			className={`user-modal__container ${isModalOpen ? '' : `hidden`}
			`}
		>
			{isModalLogin ? (
				<UserForm
					title={'Войти в аккаунт'}
					handleClick={handleLogin}
					buttonName={
						isLoading ? <CircularProgress color='inherit' size={18} /> : 'Войти'
					}
					tabIndex={isModalOpen ? 0 : -1}
				/>
			) : (
				<UserForm
					title={'Создать аккаунт'}
					handleClick={handleSignUp}
					buttonName={
						isLoading ? (
							<CircularProgress color='inherit' size={18} />
						) : (
							'Зарегистрироваться'
						)
					}
					tabIndex={isModalOpen ? 0 : -1}
				/>
			)}
		</div>
	);
};
export default UserModal;
