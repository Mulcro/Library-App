import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';

export const SidebarData = [
    {
        title: ' Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'side-text'
    },
    {
        title: ' All books',
        path: '/books',
        icon: <GiIcons.GiBookshelf/>,
        cName: 'side-text'
    },
    {
        title: ' Categories',
        path: '/categories',
        icon: <BiIcons.BiCategoryAlt/>,
        cName: 'side-text'
    },
    {
        title: ' Authors',
        path: '/authors',
        icon: <GiIcons.GiFountainPen/>,
        cName: 'side-text'
    },
    {
        title: ' Search',
        path: '/search',
        icon: <GiIcons.GiRead/>,
        cName: 'side-text'
    },
    {
        title: " User",
        path: "/user",
        icon: <FiIcons.FiUser/>,
        cName: "side-text"
    },
    {
        title: ' Admin',
        path: '/admin',
        icon: <RiIcons.RiAdminFill/>,
        cName: 'side-text'
    }
];