import { FaBuilding, FaRegBuilding } from "react-icons/fa";
import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { PiNetworkFill, PiNetworkLight } from "react-icons/pi";
import { TbLayoutDashboard, TbLayoutDashboardFilled } from "react-icons/tb";
import {
  inventory_dashboard,
  inventory_fixed,
  inventory_network,
  inventory_vendors,
} from "../../../utils/context-paths";
import SidenavParent from "../sidenavConfig";

const inventorySidenav: SidenavParent = {
  title: "Inventory Manager",
  elements: [
    {
      label: "Dashboard",
      contextPath: inventory_dashboard,
      icon: {
        default: TbLayoutDashboard,
        selected: TbLayoutDashboardFilled,
      },
    },
    {
      label: "Network Assets",
      contextPath: inventory_network,
      icon: {
        default: PiNetworkLight,
        selected: PiNetworkFill,
      },
    },
    {
      label: "Fixed Assets",
      contextPath: inventory_fixed,
      icon: {
        default: FaRegBuilding,
        selected: FaBuilding,
      },
    },
    {
      label: "Vendors",
      contextPath: inventory_vendors,
      icon: {
        default: HiOutlineUsers,
        selected: HiUsers,
      },
    },
  ],
};

export default inventorySidenav;
