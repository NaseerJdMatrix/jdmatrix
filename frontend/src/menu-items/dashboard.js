import { IconDashboard,IconBuildingBank,IconBinaryTree2,IconUsers,IconBrandUbuntu,IconMilitaryRank,IconUserExclamation,IconStars,IconBrandApplePodcast,IconTemplate ,IconBinaryTree,Icon360 ,IconBadges, } from '@tabler/icons';
import ListAltIcon from '@mui/icons-material/ListAlt';

// constant
const icons = { IconDashboard,IconBuildingBank,IconBinaryTree2,IconUsers,IconBrandUbuntu,IconMilitaryRank,IconUserExclamation,IconStars,IconBrandApplePodcast ,IconTemplate,IconBinaryTree,Icon360,IconBadges,};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Menu',
    type: 'group',
    children: [
        { 
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: 'dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'organizations',
            title: 'Organizations',
            type: 'item',
            url: 'organizations',
            icon: IconBuildingBank,
            breadcrumbs: false
        },
        {
            id: 'departments',
            title: 'Departments',
            type: 'item',
            url: 'departments',
            icon: icons.IconBinaryTree2,
            breadcrumbs: false
        },
        
        {
            id: 'configuration',
            title: 'Configuration',
            type: 'collapse',
            icon: icons.IconDashboard,

            children: [
                {
                    id: 'roles',
                    title: 'Roles',
                    type: 'item',
                    url: 'roles',
                    icon: icons.IconBrandUbuntu,
                    breadcrumbs: false
                },
                {
                    id: 'staff_type',
                    title: 'Staff Type',
                    type: 'item',
                    url: 'staff_type',
                    icon: icons.IconUserExclamation,
                    
                    breadcrumbs: false
                },
                {
                    id: 'tier',
                    title: 'Tier',
                    type: 'item',
                    url: 'tier',
                    icon: icons.IconBrandApplePodcast,
                    breadcrumbs: false
                },
                {
                    id: 'designation',
                    title: 'Designation',
                    type: 'item',
                    url: 'designation',
                    icon: icons.IconStars,
                    breadcrumbs: false
                },
                {
                    id: 'responsility',
                    title: 'Responsibility',
                    type: 'item',
                    url: 'responsibility',
                    icon: icons.IconBadges,
                    breadcrumbs: false
                },
                {
                    id: 'stackholder',
                    title: 'StakeHolder Nature',
                    type: 'item',
                    url: 'stackholder',
                    icon: icons.IconUsers,
                    breadcrumbs: false
                },
                
            ]
        },
        {
            id: 'employee',
            title: 'Employee',
            type: 'item',
            url: 'users',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'matrix',
            title: 'Matrix Template',
            type: 'item',
            url: 'template',
            icon: icons.IconTemplate,
            breadcrumbs: false
        },
        {
            id: 'assign_template',
            title: 'Assign Matrix Template',
            type: 'item',
            url: 'assign_template',
            icon: icons.IconBinaryTree,
            breadcrumbs: false
        },
        {
            id: 'view_assign_template',
            title: 'View Assigned Template',
            type: 'item',
            url: 'view_assigned_template',
            icon: icons.Icon360,
            breadcrumbs: false
        }
        
    ]
};

export default dashboard;