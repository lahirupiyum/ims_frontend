import { TbLayoutDashboard, TbLayoutDashboardFilled } from 'react-icons/tb';
import SidenavParent from "../sidenavConfig";
import { inventoryChildren } from '../../../route/routes';

const getContextPath :(path:string) => string = (path) => {
    return `/inventory/${path}`
}

const inventorySidenav:SidenavParent = {
    title: "Inventory Manager",
    elements: [
        {
            label:"Dashboard",
            contextPath:getContextPath(inventoryChildren.dashboard.path as string),
            icon:{
                default:TbLayoutDashboard,
                selected: TbLayoutDashboardFilled
            }
        }
    ]
}

export default inventorySidenav;