const setUrlRequest = (filters, searchFilter) => {
	const { sort, highRating, localsChoice, currentPage } = filters;
	const createUrlFilter = filterType => {
		return filters[filterType].length === 0
			? ''
			: `${filters[filterType].map(i => `${filterType}=${i}&`).join('')}`;
	};

	const isCategory = createUrlFilter('category');
	const isSubcategories = createUrlFilter('subcategory');
	const isDistrict = createUrlFilter('district');
	const isHighRating = highRating ? `&rating=4` : '';
	const isLocals = localsChoice ? `&locals=true` : '';
	const isSearch = searchFilter !== '' ? `&search=${searchFilter}` : '';
	const req = `${isCategory}${isSubcategories}${isDistrict}sortBy=${sort[0]}&orderBy=${sort[1]}${isSearch}${isHighRating}${isLocals}&page=${currentPage}`;
	return req;
};

export default setUrlRequest;
