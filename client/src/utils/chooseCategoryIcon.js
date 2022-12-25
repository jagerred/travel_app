import { MdFastfood, MdTheaterComedy, MdPark } from 'react-icons/md';
import { GiSaintBasilCathedral, GiMedievalGate } from 'react-icons/gi';
export const chooseCategoryIcon = category => {
	switch (category) {
		case 'f00':
			return <MdFastfood className='place-categories__icon' />;
		case 'c00':
			return <MdTheaterComedy className='place-categories__icon' />;
		case 'p00':
			return <MdPark className='place-categories__icon' />;
		case 'd00':
			return <GiSaintBasilCathedral className='place-categories__icon' />;
		case 'a00':
			return <GiMedievalGate className='place-categories__icon' />;
		default:
			return;
	}
};
