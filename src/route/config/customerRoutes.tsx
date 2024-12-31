import { RouteObject } from "react-router-dom";
import Customer from "../../screens/management/customer/customer";
import IllConnection from "../../screens/management/customer/illconnection";
import MplsConnection from "../../screens/management/customer/mplsconnection";
import {
  customer_customer,
  customer_ill_connection,
  customer_mpls_connection,
  customer_new_connection,
} from "../../utils/context-paths";
import NewConnection from "../../screens/management/customer/newconnection";

const customerRoutes: RouteObject[] = [
  {
    path: customer_customer,
    element: <Customer />,
  },
  {
    path: customer_ill_connection,
    element: <IllConnection />,
  },
  {
    path: customer_mpls_connection,
    element: <MplsConnection />,
  },
  {
    path: customer_new_connection,
    element: <NewConnection />
  }
];

export default customerRoutes;
