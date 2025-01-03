import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { PiLockers, PiLockersFill } from "react-icons/pi";
import { RiRouterFill, RiRouterLine } from "react-icons/ri";
import { IoLaptop, IoLaptopOutline } from "react-icons/io5";
import { MdHandyman, MdOutlineHandyman } from "react-icons/md";

import {
  inventory_manufacturers,
  inventory_mobileassets,
  inventory_fixed,
  inventory_network,
  inventory_vendors,
} from "../../../utils/context-paths";
import SidenavParent from "../sidenavConfig";

const inventorySidenav: SidenavParent = {
  title: "Inventory Manager",
  elements: [
    {
      label: "Mobile Assets",
      contextPath: inventory_mobileassets,
      icon: {
        default: IoLaptopOutline,
        selected: IoLaptop,
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
      label:"Manufacturers",
      contextPath: inventory_manufacturers,
      icon: {
        default: MdOutlineHandyman,
        selected: MdHandyman,
      }
    }
  ],
};

export default inventorySidenav;