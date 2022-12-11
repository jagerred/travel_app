import { useSelector } from 'react-redux';
import { selectUserEmail } from 'redux/selectors/userSelectors';
export function useAuth() {
	const email = useSelector(selectUserEmail);
	return {
		isAuth: !!email,
	};
}
