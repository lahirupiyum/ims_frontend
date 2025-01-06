import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContainedButton from "../../../../../components/buttons/ContainedButton";
import CustomTypography, {
  fontSizes,
  fontWeights,
} from "../../../../../components/typography/CustomTypography";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  connectionCreateAction,
  connectionCreateReset,
} from "../../../../../redux/slices/customer/connection/create";
import {
  cusRouterCreateAction,
  cusRouterCreateReset,
} from "../../../../../redux/slices/customer/cusrouter/create";
import { customerListReset } from "../../../../../redux/slices/customer/customer/list";
import { lastMileMediaListReset } from "../../../../../redux/slices/customer/lastmile/media/list";
import { lastMileProviderListReset } from "../../../../../redux/slices/customer/lastmile/provider/list";
import {
  peConnectionCreateAction,
  peConnectionCreateReset,
} from "../../../../../redux/slices/customer/peconnection/create";
import { networkAssetListReset } from "../../../../../redux/slices/inventory/networkAssets/list";
import { networkRouterListReset } from "../../../../../redux/slices/inventory/networkAssets/router";
import { networkSwitchListReset } from "../../../../../redux/slices/inventory/networkAssets/switch";
import {
  ConnectionRequest,
  ManageStatus,
  NetworkServiceType,
} from "../../../../../types/customer/Connection";
import { CusRouterRequest } from "../../../../../types/customer/CusRouter";
import { LastMileConnectionRequest } from "../../../../../types/customer/LastMileConnection";
import { PEConnectionRequset } from "../../../../../types/customer/PERouter";
import {
  customer_customer,
  customer_ill_connection,
  customer_mpls_connection,
} from "../../../../../utils/context-paths";
import ConnectionForm from "./ConnectionForm";
import CustomerRouterForm from "./CustomerRouterForm";
import LastMileConnectionForm from "./LastMileConnectionForm";
import PEConnectionForm from "./PEConnectionForm";

type ConnectionCreateState = {
  name: string;
  element: ReactNode;
};

const peConnectionInitial: PEConnectionRequset = {
  ip: "",
  networkSwitchId: 0,
  peRouterId: 0,
  port: "",
  switchPort: "",
  wanIpPool: "",
};

const customerRouterInitial: CusRouterRequest = {
  assetId: 0,
  bandwidth: "",
  lanPort: "",
  lanIpPool: "",
  wanPort: "",
  wanIpPool: "",
};

const lastMileConnectionInitial: LastMileConnectionRequest = {
  bandwidth: "",
  circuitId: "",
  lastMileProvider: {
    id: null,
    name: "",
  },
  media: {
    id: null,
    name: "",
  },
  switchPort: "",
};

const connectionInitial: ConnectionRequest = {
  cusRouterId: 0,
  customerId: 0,
  dsp: null,
  firewallCredentials: {
    username: "",
    password: "",
  },
  lastMileConnection: lastMileConnectionInitial,
  manageStatus: ManageStatus.MANAGEABLE,
  networkServiceType: NetworkServiceType.ILL,
  peRouterId: 0,
  remarks: "",
  serviceChange: null,
  terminationDate: null,
};

const NewConnection = () => {
  const [peConnectionForm, setPEConnectionForm] =
    useState<PEConnectionRequset>(peConnectionInitial);
  const [cusRouterForm, setCusRouterForm] = useState<CusRouterRequest>(
    customerRouterInitial
  );

  const [connectionForm, setConnectionForm] =
    useState<ConnectionRequest>(connectionInitial);

  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const navigate = useNavigate();

  const PE_ROUTER = "PROVIDER EDGE ROUTER CONFIG";
  const CUS_ROUTER = "CUSTOMER ROUTER CONFIG";
  const states: ConnectionCreateState[] = [
    {
      name: PE_ROUTER,
      element: (
        <PEConnectionForm
          peConnectionForm={peConnectionForm}
          setPEConnectionForm={setPEConnectionForm}
        />
      ),
    },
    {
      name: CUS_ROUTER,
      element: (
        <CustomerRouterForm
          customerRouterForm={cusRouterForm}
          setCustomerRouterForm={setCusRouterForm}
        />
      ),
    },
    {
      name: "LAST MILE CONNECTION CONFIG",
      element: (
        <LastMileConnectionForm
          connectionForm={connectionForm}
          setConnectionForm={setConnectionForm}
        />
      ),
    },
    {
      name: "CONNECTION CONFIG",
      element: (
        <ConnectionForm
          connectionForm={connectionForm}
          setConnectionForm={setConnectionForm}
        />
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { data: createdPEConnection, loading: peConnectionCreateLoading } =
    useAppSelector((state) => state.peConnection.create);
  const { data: createdCusRouter, loading: cusRouterCreateLoading } =
    useAppSelector((state) => state.cusRouter.create);

  const { data: createdConnection, loading: connectionLoading } =
    useAppSelector((state) => state.connection.create);

  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  useEffect(() => {
    if (createdPEConnection && createdCusRouter) {
      const finalConnectionForm: ConnectionRequest = { ...connectionForm };
      finalConnectionForm.cusRouterId = createdCusRouter.id;
      finalConnectionForm.peRouterId = createdPEConnection.id;
      setConnectionForm((prev) => ({
        ...prev,
        cusRouterId: createdCusRouter.id,
        peRouterId: createdPEConnection.id,
      }));

      dispatch(connectionCreateAction(finalConnectionForm));
    }
  }, [peConnectionCreateLoading, cusRouterCreateLoading]);

  useEffect(() => {
    if (!createdConnection) return;
    const createdNetworkServiceType = createdConnection.networkServiceType;

    dispatch(peConnectionCreateReset());
    dispatch(cusRouterCreateReset());
    dispatch(connectionCreateReset());
    dispatch(customerListReset());
    dispatch(networkAssetListReset());
    dispatch(networkSwitchListReset());
    dispatch(networkRouterListReset());
    dispatch(lastMileProviderListReset());
    dispatch(lastMileMediaListReset());

    switch (createdNetworkServiceType.toUpperCase()) {
      case NetworkServiceType.ILL:
        navigate(customer_ill_connection);
        return;
      case NetworkServiceType.MPLS:
        navigate(customer_mpls_connection);
        return;
      default:
        navigate(customer_customer);
        return;
    }
  }, [connectionLoading]);

  const handleSubmit = () => {
    const { cusRouterId, peRouterId } = connectionForm;
    if (cusRouterId !== 0 && peRouterId !== 0)
      dispatch(connectionCreateAction(connectionForm));
    else {
      if (!createdPEConnection)
        dispatch(peConnectionCreateAction(peConnectionForm));
      if (!createdCusRouter) dispatch(cusRouterCreateAction(cusRouterForm));
    }
  };

  const currentFormState = states[currentFormIndex];

  return (
    <Box
      sx={{
        height: "90dvh",
        padding: "20px",
        paddingRight: 0,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "50dvw",
          bgcolor: "white",
          padding: "20px",
          textAlign: "left",
          position: "relative",
          height: "100%",
        }}
      >
        <CustomTypography
          fontSize={fontSizes.lg}
          fontWeight={fontWeights.xl}
          sx={{ marginBottom: "40px" }}
          textAlign="center"
        >
          {currentFormState.name}
        </CustomTypography>
        {currentFormState.element}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            position: "absolute",
            bottom: "20px",
            left: 0,
            paddingX: "20px",
          }}
        >
          {currentFormIndex !== 0 && (
            <ContainedButton
              sx={{ marginTop: "20px", bgcolor: "#b0b0b0", width: "100%" }}
              onClick={() => setCurrentFormIndex(currentFormIndex - 1)}
            >
              Back
            </ContainedButton>
          )}
          <ContainedButton
            sx={{ marginTop: "20px", width: "100%", transition: "all 0.5" }}
            onClick={() => {
              if (currentFormIndex === states.length - 1) handleSubmit();
              else setCurrentFormIndex(currentFormIndex + 1);
            }}
          >
            {currentFormIndex === states.length - 1 ? "Submit" : "Next"}
          </ContainedButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NewConnection;
