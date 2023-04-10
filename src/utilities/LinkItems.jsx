import { RiBuilding2Fill } from 'react-icons/ri';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUserTie, FaSwimmer, FaHouseUser, FaMoneyBill } from 'react-icons/fa';
import { HiOfficeBuilding } from 'react-icons/hi';
import { AiFillCalculator } from 'react-icons/ai';

export const LinkItems = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/AdHome' },
	{ name: 'Employees', icon: FaUserTie, nav: '/Employees' },
	{ name: 'Condo Owners', icon: FaHouseUser },
	{ name: 'Towers', icon: RiBuilding2Fill },
	{ name: 'Condo Types', icon: HiOfficeBuilding },
	{ name: 'Condo Amenities', icon: FaSwimmer },
	{ name: 'Condo Amounts', icon: FaMoneyBill },
	{ name: 'Condo Computations', icon: AiFillCalculator },
];
