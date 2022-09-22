import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'side-text'
    },
    {
        title: 'All books',
        path: '/books',
        icon: <GiIcons.GiBookshelf/>,
        cName: 'side-text'
    },
    {
        title: 'Categories',
        path: '/',
        icon: <BiIcons.BiCategoryAlt/>,
        cName: 'side-text'
    },
    {
        title: 'Authors',
        path: '/',
        icon: <GiIcons.GiFountainPen/>,
        cName: 'side-text'
    },
    {
        title: 'Borrow',
        path: '/',
        icon: <GiIcons.GiRead/>,
        cName: 'side-text'
    },
    {
        title: 'Login',
        path: '/',
        icon: <AiIcons.AiOutlineLogin/>,
        cName: 'side-text'
    },
    {
        title: 'Admin',
        path: '/',
        icon: <RiIcons.RiAdminFill/>,
        cName: 'side-text'
    }
];