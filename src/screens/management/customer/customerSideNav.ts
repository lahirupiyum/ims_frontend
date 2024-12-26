import { BsRouter, BsRouterFill } from "react-icons/bs";
import { MdOutlinePeopleAlt, MdOutlineRouter, MdPeopleAlt, MdRouter } from "react-icons/md";
import { PiPlugsConnected, PiPlugsConnectedFill } from "react-icons/pi";
import { customer, customer_customer, customer_peRouters, customer_routers, customer_connection } from "../../../utils/context-paths";
import SidenavParent from "../sidenavConfig";

const customerSidenav: SidenavParent = {
    title: "Customer Manager",
    elements: [
        {
            label:"Connections",
            contextPath: customer_connection,
            icon: {
                default: PiPlugsConnected,
                selected: PiPlugsConnectedFill
            }
        },
        {
            label:"PE Routers",
            contextPath: customer_peRouters,
            icon: {
                default:  BsRouter,
                selected: BsRouterFill
            }
        },
        {
            label:"Customer Routers",
            contextPath: customer_routers,
            icon: {
                default: MdOutlineRouter,
                selected: MdRouter 
            }
        },
        {
            label: "Customers",
            contextPath: customer_customer,
            icon: {
                default: MdOutlinePeopleAlt,
                selected: MdPeopleAlt 
            }
        }
    ]
}

export default customerSidenav;