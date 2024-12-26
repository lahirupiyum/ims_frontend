import { RouteObject } from "react-router-dom";
import Customer from "../../screens/management/customer/customer";
import CusRouter from "../../screens/management/customer/cusrouter";
import PERouter from "../../screens/management/customer/perouter";
import Connections from "../../screens/management/customer/connections";
import { customer_customer, customer_peRouters, customer_routers, customer_connection } from "../../utils/context-paths";

const customerRoutes: RouteObject[] = [
    {
        path: customer_customer,
        element: <Customer />
    },
    {
        path: customer_peRouters,
        element: <PERouter />
    },
    {
        path: customer_routers,
        element: <CusRouter />
    },
    {
        path: customer_connection,
        element: <Connections />
    }
];

export default customerRoutes;