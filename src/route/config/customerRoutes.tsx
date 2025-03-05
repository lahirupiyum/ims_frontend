import { RouteObject } from "react-router-dom";
import Customer from "../../screens/management/customer/customer";
import IllConnection from "../../screens/management/customer/connection/ill";
import MplsConnection from "../../screens/management/customer/connection/mpls";
import {
  customer_customer,
  customer_ill_connection,
  customer_ill_view_connection,
  customer_mpls_connection,
  customer_mpls_view_connection,
  customer_new_connection,
} from "../../utils/context-paths";
import NewConnection from "../../screens/management/customer/connection/newconnection";
import ConnectionViewForm from "../../screens/management/customer/connection/connection-view/ConnectionViewForm";

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
  },
  {
    path: customer_ill_view_connection,
    element: <ConnectionViewForm />
  },
  {
    path: customer_mpls_view_connection,
    element: <ConnectionViewForm />
  }
];

export default customerRoutes;
