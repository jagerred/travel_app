import authModalReducer, {
	toggleModalOpen,
	toggleModalLogin,
	setAuthError,
} from 'redux/slices/authModalSlice';

const initialState = {
	isModalOpen: false,
	isModalLogin: true,
	authError: '',
};

describe('authModalSlice', () => {
	it('should return default state when passed an empty action', () => {
		const result = authModalReducer(undefined, { type: '' });
		expect(result).toEqual(initialState);
	});
	it('should toggle "isModalOpen" with "toggleModalOpen" action', () => {
		const action = { type: toggleModalOpen.type };
		const result = authModalReducer(initialState, action);
		expect(result.isModalOpen).toBe(true);
	});
	it('should toggle "isModalLogin" with "toggleModalLogin" action', () => {
		const action = { type: toggleModalLogin.type };
		const result = authModalReducer(initialState, action);
		expect(result.isModalLogin).toBe(false);
	});
	it('should add auth error text with "setAuthError" action', () => {
		const action = { type: setAuthError.type, payload: 'Error text' };
		const result = authModalReducer(initialState, action);
		expect(result.authError).toBe('Error text');
	});
});
