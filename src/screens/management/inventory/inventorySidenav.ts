import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { PiBuildingsBold, PiBuildingsFill, PiLockers, PiLockersFill } from "react-icons/pi";
import { RiRouterFill, RiRouterLine } from "react-icons/ri";
import { TbLayoutDashboard, TbLayoutDashboardFilled } from "react-icons/tb";
import {
  inventory_branch,
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
        default: RiRouterLine,
        selected: RiRouterFill,
      },
    },
    {
      label: "Fixed Assets",
      contextPath: inventory_fixed,
      icon: {
        default: PiLockers,
        selected: PiLockersFill,
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
    {
      label:"Branches",
      contextPath: inventory_branch,
      icon: {
        default: PiBuildingsBold,
        selected: PiBuildingsFill,
      }
    }
  ],
};

export default inventorySidenav;
