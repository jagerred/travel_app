export const selectFilters = state => state.filters.filters;
export const selectFiltersSort = state => state.filters.filters.sort;
export const selectFilterResultTotal = state => state.filterResult.totalPlaces;
export const selectFilterResult = state => state.filterResult;
export const selectFilterSubcategory = state =>
	state.filters.filters.subcategory;
export const selectDistricts = state => state.filters.districts;
export const selectDistrictsLoadStatus = state =>
	state.filters.districtsLoadStatus;
export const selectMobileVisible = state => state.filters.mobileVisible;
export const selectCurrentPage = state => state.filters.filters.currentPage;
export const selectPages = state => state.filterResult.pages;
export const selectSubcategories = state => state.subcategories;
