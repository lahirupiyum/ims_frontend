import Login from "../../login/Login";
import SidenavParent from "../sidenavConfig";
import { TbLayoutDashboard, TbLayoutDashboardFilled } from 'react-icons/tb';

const inventorySidenav:SidenavParent = {
    title: "Inventory Management",
    elements: [
        {
            label:"Dashboard",
            contextPath:"dashboard",
            component: Login,
            icon:{
                default:TbLayoutDashboard,
                selected: TbLayoutDashboardFilled
            }
        }
    ]
}

export default inventorySidenav;