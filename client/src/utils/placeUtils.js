export const checkCurrentCity = (cities, cityId) => {
	if (cities.length !== 0) return cities.find(i => i.id === cityId);
	return null;
};
export const isItemInArr = (arr, currentId) => {
	return (arr.find(item => item.id === currentId) && true) || false;
};
