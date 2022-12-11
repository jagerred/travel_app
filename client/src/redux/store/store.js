import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import citiesReducer from '../slices/citiesSlice';
import filterResultReducer from '../slices/filterResultSlice';
import searchReducer from '../slices/searchSlice';
import placeReducer from '../slices/placeSlice';
import filtersReducer from '../slices/filtersSlice';
import placeCategoriesReducer from '../slices/placeCategoriesSlice';
import subcategoriesReducer from '../slices/subcategoriesSlice';
import globalReducer from '../slices/globalSlice';
import themeReducer from '../slices/themeSlice';
import userReducer from '../slices/userSlice';
import authModalReducer from '../slices/authModalSlice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'theme'],
};

const rootReducer = combineReducers({
	cities: citiesReducer,
	filterResult: filterResultReducer,
	search: searchReducer,
	place: placeReducer,
	filters: filtersReducer,
	subcategories: subcategoriesReducer,
	placeCategories: placeCategoriesReducer,
	global: globalReducer,
	theme: themeReducer,
	user: userReducer,
	authModal: authModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export default store;
