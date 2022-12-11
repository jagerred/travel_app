import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectUserServerError } from 'redux/selectors/userSelectors';
import { setErrorPopupMessage } from 'redux/slices/globalSlice';
import { MdClose } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { toggleServerError } from 'redux/slices/userSlice';

const ErrorPopup = () => {
	const dispatch = useDispatch();
	const darkTheme = useSelector(selectDarkTheme);

	const serverError = useSelector(selectUserServerError);
	const darkClass = darkTheme ? 'dark-card' : '';
	let closePopupTimeout;

	useEffect(() => {
		if (serverError) {
			closePopupTimeout = setTimeout(() => dispatch(toggleServerError()), 5000);
		}
		return () => {
			clearTimeout(closePopupTimeout);
		};
	}, [serverError]);

	return serverError ? (
		<div className='error-popup'>
			<div className={`error-popup__container ${darkClass}`}>
				<BiError className='error-popup__icon' />
				<h3 className='error-popup__title'>Ошибка!</h3>
				<span className='error-popup__message'>
					Не удалось достучаться до сервера...
				</span>
				<button
					className='button error-popup__close-button'
					onClick={() => dispatch(toggleServerError())}
				>
					<MdClose size={20} />
				</button>
			</div>
		</div>
	) : null;
};

export default ErrorPopup;
