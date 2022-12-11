const checkPlaceOpen = time => {
	if (time.length === 0)
		return { isOpen: null, startTime: null, endTime: null, nextDayStart: null };
	const currentDate = new Date();
	const currentDay = currentDate.getDay();
	const nextDay = currentDay === 6 ? 0 : currentDay + 1;
	let startTime, endTime, nextDayStart;

	if (time.length === 1) {
		startTime = time[0].start;
		endTime = time[0].end;
		nextDayStart = startTime;
	} else {
		const todayTime = time.filter(i => i.day.includes(currentDay));
		startTime = todayTime[0].start;
		endTime = todayTime[0].end;

		time.forEach(i => {
			if (i.day.includes(nextDay)) {
				nextDayStart = i.start;
			}
		});
	}

	let startDate = new Date(currentDate.getTime());
	startDate.setHours(startTime.split(':')[0]);
	startDate.setMinutes(startTime.split(':')[1]);

	let endDate = new Date(currentDate.getTime());
	endDate.setHours(endTime.split(':')[0]);
	endDate.setMinutes(endTime.split(':')[1]);
	return {
		isOpen: startDate < currentDate && endDate > currentDate,
		startTime,
		endTime,
		nextDayStart,
	};
};
export default checkPlaceOpen;
