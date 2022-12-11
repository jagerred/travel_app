import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/use-auth';
import { toggleModalOpen } from 'redux/slices/authModalSlice';

import PlaceReview from 'components/singlePlace/SinglePlaceReview/SinglePlaceReview';
import ReviewForm from 'components/singlePlace/ReviewForm/ReviewForm';
import { v4 } from 'uuid';
import declarationOfNumber from 'utils/declarationOfNumber';
import { selectUserInfo } from 'redux/selectors/userSelectors';
import { selectPlaceData } from 'redux/selectors/placeSelectors';

const SinglePlaceReviews = () => {
	const [myReview, setMyReview] = useState(false);
	const { isAuth } = useAuth();
	const dispatch = useDispatch();

	const userInfo = useSelector(selectUserInfo);
	const { reviews } = useSelector(selectPlaceData);

	const renderReviews = () => {
		if (reviews.length === 0) return <span>Отзывов еще нет</span>;
		return reviews.map(({ uid, name, rating, text, photo }) => {
			if (userReview && userReview.uid === uid) return;
			return (
				<PlaceReview
					key={v4()}
					name={name}
					rating={rating}
					text={text}
					isUserReview={false}
					photo={photo}
				/>
			);
		});
	};
	const userReview = reviews.find(i => i.uid === userInfo.uid);
	const toggleMyReview = () => {
		if (userReview) return;
		setMyReview(!myReview);
	};

	return (
		<section className='single-place-review__wrapper'>
			{userReview ? (
				<PlaceReview
					name={userReview.name}
					rating={userReview.rating}
					text={userReview.text}
					isUserReview={true}
					photo={userReview.photo}
				/>
			) : myReview ? (
				<ReviewForm toggleMyReview={toggleMyReview} />
			) : (
				<button
					className='single-place-review__button'
					onClick={() => {
						isAuth ? toggleMyReview() : dispatch(toggleModalOpen());
					}}
				>
					Оставить отзыв
				</button>
			)}

			<h3 className='single-place-review__title'>
				{reviews.length}{' '}
				{declarationOfNumber(reviews.length, ['отзыв', 'отзыва', 'отзывов'])}
			</h3>
			<ul className='single-place-review__list'>{renderReviews()}</ul>
		</section>
	);
};
export default SinglePlaceReviews;
