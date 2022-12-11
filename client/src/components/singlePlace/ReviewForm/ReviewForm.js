import { Controller, useForm } from 'react-hook-form';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, postReview } from 'redux/slices/placeSlice';
import { useParams } from 'react-router-dom';

import { putRating } from 'redux/slices/filterResultSlice';
import { selectDarkTheme } from 'redux/selectors/globalSelectors';
import { selectPlaceData } from 'redux/selectors/placeSelectors';
import { selectUserInfo } from 'redux/selectors/userSelectors';

const ReviewForm = ({ toggleMyReview }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm({
		mode: 'onBlur',
	});

	const { cityId, placeId } = useParams();
	const { reviews } = useSelector(selectPlaceData);
	const { name, uid, photo } = useSelector(selectUserInfo);
	const darkTheme = useSelector(selectDarkTheme);
	const dispatch = useDispatch();

	const averageRating = reviewRating => {
		const ratingBefore =
			reviews.reduce((sum, i) => sum + +i.rating, reviewRating) /
			(reviews.length + 1);
		return ratingBefore % 1 === 0
			? ratingBefore.toFixed(0)
			: ratingBefore.toFixed(1);
	};

	const onSubmit = data => {
		const rating = averageRating(+data.rating);
		dispatch(postReview({ cityId, placeId, review: { uid, name, ...data } }));
		dispatch(addReview({ uid, name, photo, ...data }));
		dispatch(
			putRating({
				cityId,
				placeId,
				ratingCount: { rating },
			})
		);
		toggleMyReview();
	};

	return (
		<>
			<form
				className={`review-form__container ${
					darkTheme ? 'review-form__container--dark' : ''
				}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='review-form__user'>
					<div className='review-form__photo'>
						<img src={`/${photo}`} alt='' className='image' />
					</div>
					<div className='review-form__info'>
						<span className='review-form__name'>{name}</span>
						<Controller
							name='rating'
							control={control}
							defaultValue={3}
							rules={{ required: true }}
							render={({ field: { onChange } }) => (
								<Rating
									sx={{ color: '#3359e6' }}
									name='rating'
									onChange={onChange}
									emptyIcon={null}
								/>
							)}
						/>

						{errors?.rating && (
							<span className='review-form__error'>
								{errors?.rating?.message || 'Напишите отзыв'}
							</span>
						)}
					</div>
				</div>
				<textarea
					placeholder='Ваш отзыв'
					className='review-form__review'
					{...register('text', { required: 'Напишите отзыв' })}
				></textarea>
				{errors?.text && (
					<span className='review-form__error'>
						{errors?.text?.message || 'Напишите отзыв'}
					</span>
				)}
				<button className='button review-form__button' disabled={!isValid}>
					Отправить
				</button>
			</form>
		</>
	);
};
export default ReviewForm;
