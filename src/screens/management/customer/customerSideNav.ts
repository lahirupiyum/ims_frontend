import {
  MdCable,
  MdOutlineCable,
  MdOutlinePeopleAlt,
  MdPeopleAlt,
} from "react-icons/md";
import { PiCellTower, PiCellTowerBold } from "react-icons/pi";
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
        default: PiCellTower,
        selected: PiCellTowerBold,
      },
    },
    {
      label: "MPLS Connections",
      contextPath: customer_mpls_connection,
      icon: {
        default: PiCellTower,
        selected: PiCellTowerBold,
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
