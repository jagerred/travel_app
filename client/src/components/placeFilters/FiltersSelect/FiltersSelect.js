const FiltersSelect = ({ changeSort, sort }) => {
	return (
		<label htmlFor='#' className='filter-result__sort'>
			Поиск по:
			<select
				name='sort-by'
				id='sort-by'
				className='filter-result__select'
				value={sort}
				onChange={changeSort}
			>
				<option value='name' className='filter-result__option'>
					имени
				</option>
				<option value='likes' className='filter-result__option'>
					лайкам
				</option>
			</select>
		</label>
	);
};

export default FiltersSelect;
