import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { changeCurrentPage } from 'redux/slices/filtersSlice';
import { v4 } from 'uuid';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';
import {
	selectCurrentPage,
	selectPages,
} from 'redux/selectors/filtersSelectors';

const PaginationNav = () => {
	const dispatch = useDispatch();

	const currentPage = useSelector(selectCurrentPage);
	const pages = useSelector(selectPages);

	const handlePage = useCallback(
		i => {
			const stop = i > 0 ? pages : 1;
			if (currentPage === stop) return;
			dispatch(changeCurrentPage(currentPage + i));
		},
		[currentPage, pages]
	);

	const renderButtons = () => {
		const buttons = [];
		for (let i = 1; i <= pages; i++) {
			const activeClass =
				i === currentPage ? 'filter-result__button--active' : '';
			buttons.push(
				<button
					key={`page${i}`}
					className={`button filter-result__button filter-result__button--number ${activeClass}`}
					onClick={() => {
						dispatch(changeCurrentPage(i));
					}}
				>
					{i}
				</button>
			);
		}
		return buttons;
	};

	return (
		<div className='filter-result__buttons'>
			<button
				className='button filter-result__button'
				onClick={() => handlePage(-1)}
			>
				<BsArrowLeftShort size='20' />
			</button>
			<div className='filter-result__buttons-container'>{renderButtons()}</div>
			<button
				className='button filter-result__button '
				onClick={() => handlePage(1)}
			>
				<BsArrowRightShort size='20' />
			</button>
		</div>
	);
};

export default PaginationNav;
