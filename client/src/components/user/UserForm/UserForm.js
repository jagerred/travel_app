import { useEffect, useRef } from 'react';
import { useOnClickOutside } from 'hooks/use-onclick-outside';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'pictures/img/login.png';
import { FaUserCircle } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdClose } from 'react-icons/md';
import { toggleModalLogin, toggleModalOpen } from 'redux/slices/authModalSlice';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
const UserForm = ({ title, handleClick, buttonName }) => {
	const modalRef = useRef(null);
	const {
		register,
		handleSubmit,
		setFocus,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onSubmit',
	});

	const dispatch = useDispatch();
	const { isModalLogin, isModalOpen, authError } = useSelector(
		state => state.authModal
	);
	useEffect(() => {
		if (!isModalOpen) return;
		isModalLogin ? setFocus('email') : setFocus('name');
	}, [isModalLogin, isModalOpen]);

	const darkTheme = useSelector(selectDarkTheme);
	const inputClass = `user-form__input ${
		darkTheme ? 'user-form__input--dark' : ''
	}`;
	const onSubmit = data => handleClick(data.email, data.password, data.name);
	const iconTheme = `${darkTheme ? 'user-form__icon--dark' : ''}`;
	const isRegister = !isModalLogin ? (
		<div className='user-form__input-container'>
			<FaUserCircle className={`user-form__icon ${iconTheme}`} />
			<input
				type='text'
				className={inputClass}
				placeholder='Полное имя'
				{...register('name')}
			/>
		</div>
	) : null;

	useOnClickOutside(modalRef, () => dispatch(toggleModalOpen()), !isModalOpen);
	return (
		<>
			<div
				className={`user-form__container ${darkTheme ? 'dark-card' : ''}`}
				ref={modalRef}
			>
				<MdClose
					size={28}
					className='user-form__close'
					onClick={() => dispatch(toggleModalOpen())}
				/>
				<h2 className='user-form__title'>{title}</h2>
				<div className='user-form__img'>
					<img src={logo} alt='' className='image' />
				</div>
				<form
					action=''
					className='user-form__form'
					onSubmit={handleSubmit(onSubmit)}
				>
					{isRegister}
					<div className='user-form__input-container'>
						<MdAlternateEmail className={`user-form__icon ${iconTheme}`} />
						<input
							type='email'
							className={inputClass}
							placeholder='Email'
							{...register('email', { required: 'Email обязателен' })}
						/>
					</div>
					{errors?.email && (
						<span className='user-form__error'>
							{errors?.email?.message || 'Email is required'}
						</span>
					)}
					<div className='user-form__input-container'>
						<RiLockPasswordFill className={`user-form__icon ${iconTheme}`} />
						<input
							type='password'
							className={inputClass}
							placeholder='Пароль'
							{...register('password', {
								required: 'И пароль тоже!',
								minLength: {
									value: 5,
									message: 'Минимум 5 символов',
								},
							})}
						/>
					</div>
					{errors?.password && (
						<span className='user-form__error'>
							{errors?.password?.message || 'Password is required'}
						</span>
					)}
					<button
						type='submit'
						className='button user-form__button'
						disabled={!isValid}
					>
						{buttonName}
					</button>
				</form>
				<div className='user-form__text'>
					{isModalLogin ? `Нет аккаунта?` : 'Есть аккаунт?'}
					<span
						className='user-form__link'
						onClick={() => dispatch(toggleModalLogin())}
					>
						{isModalLogin ? `Создать` : 'Войти'}
					</span>
				</div>

				<span className='user-form__error'>{authError}</span>
			</div>
		</>
	);
};
export default UserForm;
