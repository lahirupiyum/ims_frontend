import {
  MdCable,
  MdOutlineCable,
  MdOutlinePeopleAlt,
  MdPeopleAlt,
} from "react-icons/md";
import { TbBuildingBroadcastTower, TbBuildingBroadcastTowerFilled } from "react-icons/tb";
import {
  customer_customer,
  customer_ill_connection,
  customer_mpls_connection,
  customer_new_connection,
} from "../../../utils/context-paths";
import SidenavParent from "../sidenavConfig";

const customerSidenav: SidenavParent = {
  title: "Customer Manager",
  elements: [
    {
      label: "ALL Customers",
      contextPath: customer_customer,
      icon: {
        default: MdOutlinePeopleAlt,
        selected: MdPeopleAlt,
      },
    },
    {
      label: "ILL Connections",
      contextPath: customer_ill_connection,
      icon: {
        default: TbBuildingBroadcastTower,
        selected: TbBuildingBroadcastTowerFilled,
      },
    },
    {
      label: "MPLS Connections",
      contextPath: customer_mpls_connection,
      icon: {
        default: TbBuildingBroadcastTower,
        selected: TbBuildingBroadcastTowerFilled,
      },
    },
    {
      label: "New Connection",
      contextPath: customer_new_connection,
      icon: {
        default: MdOutlineCable,
        selected: MdCable,
      },
    },
  ],
};

export default customerSidenav;
