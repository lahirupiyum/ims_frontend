import { FaBuilding, FaRegBuilding } from 'react-icons/fa';
import { PiNetworkFill, PiNetworkLight } from 'react-icons/pi';
import { TbLayoutDashboard, TbLayoutDashboardFilled } from 'react-icons/tb';
import SidenavParent from "../sidenavConfig";
import { inventoryRoutes } from '../../../route/config/inventory/inventoryRoutes';

const getContextPath :(key:string) => string = (key) => {
    const path = inventoryRoutes[key].path as string
    if (!path) throw new Error("Context path cannot be found for "+key);
    return `/inventory/${path}`
}

const inventorySidenav:SidenavParent = {
    title: "Inventory Manager",
    elements: [
        {
            label:"Dashboard",
            contextPath:getContextPath("dashboard"),
            icon:{
                default:TbLayoutDashboard,
                selected: TbLayoutDashboardFilled
            }
        },
        {
            label:"Network Assets",
            contextPath: getContextPath("networkAsset"),
            icon:{
                default:PiNetworkLight,
                selected:PiNetworkFill
            }
        },
        {
            label:"Fixed Assets",
            contextPath: getContextPath("fixedAsset"),
            icon: {
                default:FaRegBuilding,
                selected:FaBuilding
            }
        }
    ]
}

export default inventorySidenav;