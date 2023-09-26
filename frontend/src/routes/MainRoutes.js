import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import Organisations from 'views/organizations';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const OrganizationDefault = Loadable(lazy(() => import('views/organizations')));
const OrganizationDetail = Loadable(lazy(() => import('views/organizations/OrganizationDetail')));
const DepartmentsDefault = Loadable(lazy(() => import('views/departments')));
const DepartmentsDetail = Loadable(lazy(() => import('views/departments/DepartmentDetail')));
const AddDepartments = Loadable(lazy(() => import('views/departments/AddDepartments')));
const Roles = Loadable(lazy(() => import('views/roles')));
const Users = Loadable(lazy(() => import('views/users')));
const AddUser = Loadable(lazy(() => import('views/users/AddUser')));
const StaffType = Loadable(lazy(() => import('views/StaffType')));
const Tier = Loadable(lazy(() => import('views/tier')));
const Designation = Loadable(lazy(() => import('views/designation')));
const LevelOfEmployee = Loadable(lazy(() => import('views/level_of_employee')));
const EmployeeDetail = Loadable(lazy(() => import('views/users/EmployeeDetail')));
const EditEmployee = Loadable(lazy(() => import('views/users/EditEmployee')));
const MatrixTemplate = Loadable(lazy(() => import('views/matrix_template')));
const ADDMatrixTemplate = Loadable(lazy(() => import('views/matrix_template/Add_Template')));
const TemplateDetail = Loadable(lazy(() => import('views/matrix_template/Template_detail')));
const FunctionDetail = Loadable(lazy(() => import('views/matrix_template/Function_detail')));
const AddSubFunction = Loadable(lazy(() => import('views/matrix_template/SubFunction/AddSubFunction.js')));
const Responsility = Loadable(lazy(() => import('views/Responsibility')));
const Stakeholder = Loadable(lazy(() => import('views/StakeHolders')));
const AssignTemplate = Loadable(lazy(() => import('views/matrix_template/AssignMatrix')));
const ViewAssignTemplate = Loadable(lazy(() => import('views/AssignTemplate')));
const AssignedTemplateDetail = Loadable(lazy(() => import('views/AssignTemplate/AssignedTemplateDetail')));
const EditProfile = Loadable(lazy(() => import('views/EditProfile')));
const ChangePassword = Loadable(lazy(() => import('views/ChangePassword')));
const EmployeeTemplateDetail = Loadable(lazy(() => import('views/users/EmployeeTemplateDetail')));
const AuthorizedComponent = Loadable(lazy(() => import('views/Authorization/Index')));
const AddFunctionComponent = Loadable(lazy(() => import('views/matrix_template/AddFunctions')));
const EditFunctionComponent = Loadable(lazy(() => import('views/matrix_template/EditFunction')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
// DashboardDefault
const MainRoutes = {

    path: '/admin',
    element: <MainLayout />,
    children: [
        {
            path: '/admin/dashboard',
            element: <AuthorizedComponent Component={DashboardDefault}/>
        },
        {
            path: '/admin/organizations',
            element: <AuthorizedComponent Component={OrganizationDefault} />
        },
        {
            path: '/admin/organizations/organization_detail/:id',
            element: <AuthorizedComponent Component={OrganizationDetail} />
        },
        {
            path: '/admin/departments',
            element: <AuthorizedComponent Component={DepartmentsDefault} />
        },
        {
            path: '/admin/departments/add/:org_id',
            element: <AuthorizedComponent Component={AddDepartments} />
        },
        {
            path: '/admin/departments/departmentDetail/:id',
            element: <AuthorizedComponent Component={DepartmentsDetail} />
        },
        {
            path: '/admin/roles/',
            element: <AuthorizedComponent Component={Roles}/>
        },
        {
            path: '/admin/staff_type/',
            element: <AuthorizedComponent Component={StaffType}/>
        },
        {
            path: '/admin/tier/',
            element: <AuthorizedComponent Component={Tier}/>
        },
        {
            path: '/admin/designation/',
            element: <AuthorizedComponent Component={Designation}/>
        },
        {
            path: '/admin/level/',
            element: <AuthorizedComponent Component={LevelOfEmployee}/>
        },
        {
            path: '/admin/users/',
            element: <AuthorizedComponent Component={Users}/>
        },
        {
            path: '/admin/users/add',
            element: <AuthorizedComponent Component={AddUser}/>
        },
        {
            path: '/admin/users/detail/:id',
            element: <AuthorizedComponent Component={EmployeeDetail}/>
        },
        {
            path: '/admin/users/edit/:id',
            element: <AuthorizedComponent Component={EditEmployee}/>
        },
        {
            path: '/admin/template/',
            element: <AuthorizedComponent Component={MatrixTemplate}/>
        },
        {
            path: '/admin/add_template/',
            element: <AuthorizedComponent Component={ADDMatrixTemplate}/>
        },
        {
            path: '/admin/add_sub_function/:parent_id/:template_id',
            element: <AuthorizedComponent Component={AddSubFunction}/>
        },
        {
            path: '/admin/template/template_detail/:id',
            element: <AuthorizedComponent Component={TemplateDetail}/>
        },
        {
            path: '/admin/template/function_detail/:id',
            element: <AuthorizedComponent Component={FunctionDetail}/>
        },
        {
            path: '/admin/responsibility/',
            element: <AuthorizedComponent Component={Responsility}/>
        },
        {
            path: '/admin/stackholder/',
            element: <AuthorizedComponent Component={Stakeholder}/>
        },
        {
            path: '/admin/assign_template/',
            element: <AuthorizedComponent Component={AssignTemplate}/>
        },
        {
            path: '/admin/view_assigned_template/',
            element: <AuthorizedComponent Component={ViewAssignTemplate}/>
        },
        {
            path: '/admin/assigned_template_detail/:id',
            element: <AuthorizedComponent Component={AssignedTemplateDetail}/>
        },
        {
            path: '/admin/edit_profile/',
            element: <AuthorizedComponent Component={EditProfile}/>
        },
        {
            id:'change_password',
            path: '/admin/change_password/',
            element: <AuthorizedComponent Component={ChangePassword}/>
        },
        {
            id:'employee_template_detail',
            path: '/admin/employee/employee_template_detail/:employee_id/:index',
            element: <AuthorizedComponent Component={EmployeeTemplateDetail}/>
        },
        {
            id:'employee_template_detail',
            path: '/admin/add_functions/:template_id',
            element: <AuthorizedComponent Component={AddFunctionComponent}/>
        },
        {
            id:'employee_template_detail',
            path: '/admin/edit_function/:function_id',
            element: <AuthorizedComponent Component={EditFunctionComponent}/>
        },
        
    ]
};

export default MainRoutes;
