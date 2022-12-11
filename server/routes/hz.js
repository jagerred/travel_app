import { Router } from 'express';
import express from 'express';
import _ from 'lodash';
import Data from '../models/cities.js';
const router = Router();
router.use(express.json());
//---Поиск места
router.get('/:id/place/:search', async (req, res) => {
	const gettingData = await Data.findById(req.params.id);
	const filteredData = gettingData.places.filter(item =>
		item.name.toLowerCase().includes(req.params.search)
	);
	res.json(filteredData);
});
router.get('/:search', async (req, res) => {
	const gettingData = await Data.find({}, { name: 1 });
	const filteredData = gettingData.filter(item =>
		item.name.toLowerCase().includes(req.params.search)
	);
	res.json(filteredData);
});
//---Получить города
router.get('/', async (req, res) => {
	const { search } = req.query;
	let gettingData = await Data.find();
	gettingData = search
		? gettingData.filter(item => item.name.toLowerCase().includes(search))
		: gettingData;

	res.json(gettingData);
});

//---Получить город для поиска
router.get('/:id/search', async (req, res) => {
	const gettingData = await Data.find(
		{ _id: req.params.id },
		{ photos: 1, name: 1 }
	);
	res.json(gettingData[0]);
});
//---Получить место по id
router.get('/:id/places/:placeId', async (req, res) => {
	const gettingData = await Data.findById(req.params.id);
	const filteredData = _.filter(gettingData.places, { id: req.params.placeId });
	res.json(filteredData);
});
//---Получить районы
router.get('/:id/districts', async (req, res) => {
	const gettingData = await Data.find(
		{ _id: req.params.id },
		{ _id: 0, districts: 1 }
	);
	res.json(gettingData[0].districts);
});

//---Получить по фильтру места
router.get('/:id/places', async (req, res) => {
	const gettingData = await Data.findById(req.params.id);
	const { page, search, rating, sortBy, orderBy, ...filters } = req.query;
	let pageCount = 0;
	let placeSliceEnd = '';
	const limit = 6;
	let places = [];

	let withoutSub = {
		category: [],
	};
	let withSub = {
		category: [],
		subcategory: [],
	};

	const subCheck = {
		food: ['restourants', 'cafe', 'fastfood', 'bars'],
		attraction: ['statues', 'buildings', 'places'],
		culture: ['museums', 'theaters', 'cinema', 'art-space'],
		architecture: ['history-buildings', 'churches'],
		parks: ['improvement', 'old', 'gardens'],
	};

	for (let key in filters) {
		if (typeof filters[key] === 'string') {
			filters[key] = [filters[key]];
		}
	}
	const { category, subcategory } = filters;

	const fillWithSub = () => {
		if (!subcategory) {
			return;
		}
		subcategory.forEach(sub => {
			for (let key in subCheck) {
				if (subCheck[key].includes(sub)) {
					withSub.category.push(key);
					withSub.subcategory.push(sub);
				}
			}
		});
	};
	const fillWithoutSub = () => {
		if (withSub.category.length === 0) {
			withoutSub.category = category;
			return;
		}
		if (!category) {
			withSub.category = [];
			return;
		}
		withoutSub.category = category.filter(cat => {
			!withSub.category.includes(cat);
		});
	};

	if (search) {
		places = gettingData.places.filter(item =>
			item.name.toLowerCase().includes(search)
		);
	}
	//---Формируем массивы с подкатегориями и без
	console.log(category);
	fillWithSub();
	fillWithoutSub();
	console.log(withSub, withoutSub);
	const arrWithSub =
		withSub.category.length === 0
			? []
			: gettingData.places.filter(o =>
					Object.keys(withSub).every(k => withSub[k].some(f => o[k] === f))
			  );
	//const arrWithoutSub = gettingData.places.filter(o =>
	//	Object.keys(withoutSub).every(k => withoutSub[k].some(f => o[k] === f))
	//);
	console.log(withoutSub, withSub);
	const arrWithoutSub =
		withoutSub.category.length === 0
			? gettingData.places
			: gettingData.places.filter(i => withoutSub.category.includes(i));
	places = [...arrWithSub, ...arrWithoutSub];
	places = _.sortBy(places, [sortBy]);
	places = _.orderBy(places, [sortBy], [orderBy]);

	if (rating) {
		places = places.filter(i => Number(i.rating) >= Number(rating));
		pageCount = Math.ceil(places.length / limit);
		places = places.slice((page - 1) * limit, page * limit);
		res.json({ places, pageCount });
		return;
	}
	pageCount = Math.ceil(places.length / limit);
	placeSliceEnd = pageCount === page ? null : page * limit;
	places = places.slice((page - 1) * limit, placeSliceEnd);
	res.json({ places, pageCount });
});
router.post('/:cityId/:placeId/reviews', async (req, res) => {
	console.log(req.body);
	Data.findOneAndUpdate(
		{ _id: req.params.cityId, 'places.id': req.params.placeId },
		{ $push: { 'places.$.reviews': req.body } },
		(err, post) => {
			if (err) {
				console.log(err);
				res.end();
			} else {
				console.log(post);
				res.end();
			}
		}
	);
});
router.put('/:cityId/:placeId/likes', async (req, res) => {
	Data.findOneAndUpdate(
		{ _id: req.params.cityId, 'places.id': req.params.placeId },
		{ $set: { 'places.$.likes': req.body.likes } },
		(err, post) => {
			if (err) {
				console.log(err);
				res.end();
			} else {
				console.log(post);
				res.end();
			}
		}
	);
});
router.put('/:cityId/:placeId/rating', async (req, res) => {
	Data.findOneAndUpdate(
		{ _id: req.params.cityId, 'places.id': req.params.placeId },
		{ $set: { 'places.$.rating': req.body.rating } },
		(err, post) => {
			if (err) {
				console.log(err);
				res.end();
			} else {
				console.log(post);
				res.end();
			}
		}
	);
});
//router.post('/', async (req, res) => {
//	const data = new Data({
//		title: req.body.title,
//	});
//	const savedData = data.save();
//	res.json(savedData);
//});

export default router;
