import themeReducer, { toggleTheme } from 'redux/slices/themeSlice';

const initialState = {
	darkTheme: false,
};
describe('themeSlice', () => {
	it('toggle darkTheme', () => {
		const state = themeReducer(initialState, { type: toggleTheme.type });
		expect(state.darkTheme).toBe(true);
	});
});
