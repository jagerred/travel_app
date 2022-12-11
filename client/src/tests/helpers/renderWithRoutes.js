import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithRoutes = (component, initialRoute = '/') => {
	return render(
		<MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
	);
};
