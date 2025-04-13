import { Box, IconButton, lighten, useTheme } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTypography, {
  fontColors,
  fontSizes,
  fontWeights,
} from "../../../../../components/typography/CustomTypography";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { resetConnection } from "../../../../../redux/slices/customer/connection/view";
import { NetworkServiceType } from "../../../../../types/customer/Connection";
import {
  customer_ill_connection,
  customer_ill_view_connection,
  customer_mpls_connection,
  customer_mpls_view_connection,
} from "../../../../../utils/context-paths";
import ConnectionUpdateForm from "./ConnectionUpdateForm";
import CustomerRouterUpdateForm from "./CustomerRouterUpdateForm";
import FirewallCredentialsUpdateForm from "./FirewallCredentialsUpdateFrom";
import LastMileConnectionUpdateForm from "./LastMileConnectionUpdateForm";
import PEConnectionUpdateForm from "./PEConnectionUpdateForm";

const ConnectionViewForm = () => {
  const [isPEFormOpen, setIsPEFormOpen] = useState(false);
  const [isLastMileForm, setIsLastMileForm] = useState(false);
  const [isCusRouterForm, setIsCusRouterForm] = useState(false);
  const [isFCFormOpen, setIsFCFormOpen] = useState(false);
  const [isConnectionFormOpen, setIsConnectionFormOpen] = useState(false);
  const [connectionFormType, setConnectionFormType] = useState<
    "remark" | "connection"
  >("connection");

  const { connection: selectedConnection } = useAppSelector(
    (state) => state.connection.view
  );

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedConnection) return;
    switch (pathname) {
      case customer_ill_view_connection:
        navigate(customer_ill_connection);
        return;
      case customer_mpls_view_connection:
        navigate(customer_mpls_connection);
        return;
    }
    return () => {
      dispatch(resetConnection());
    };
  }, []);

  const getDate = (date: number | null) =>
    date ? new Date(date).toISOString().substring(0, 10) : "N/A";

  if (!selectedConnection) return null;

  const connectionDetails: Detail[] = [
    {
      label: "Network Service Type",
      value: selectedConnection.networkServiceType,
    },
    { label: "Date of Provisioning", value: getDate(selectedConnection.dsp) },
    {
      label: "Service Change Date",
      value: getDate(selectedConnection.serviceChange),
    },
    { label: "Manage Status", value: selectedConnection.manageStatus },
    {
      label: "Termination Date",
      value: getDate(selectedConnection.terminationDate),
    },
    {
      label: "Location",
      value: selectedConnection.peRouter.peRouter.location.name,
    },
    {
      label: "Provisioning Status",
      value: selectedConnection.provisioningStatus
    }
  ];

  const { peRouter } = selectedConnection;

  const peRouterDetails: Detail[] = [
    { label: "PE Router Serial No", value: peRouter.peRouter.serialNumber },
    { label: "PE Interface", value: peRouter.peInterface },
    { label: "IP", value: peRouter.ip },
    { label: "WAN IP Pool", value: peRouter.wanIpPool },
    { label: "Switch Port", value: peRouter.switchPort },
    { label: "Switch Serial No", value: peRouter.networkSwitch.serialNumber },
  ];

  const { lastMileConnection } = selectedConnection;

  const lastMileDetails: Detail[] = [
    { label: "Circuit ID", value: lastMileConnection.circuitId },
    {
      label: "Last Mile Provider",
      value: lastMileConnection.lastMileProvider.name,
    },
    { label: "Last Mile Media", value: lastMileConnection.media.name },
    { label: "Bandwidth", value: lastMileConnection.bandwidth },
    { label: "Switch Port", value: lastMileConnection.switchPort },
  ];

  const { firewallCredentials } = selectedConnection;

  const firewallCredentialDetail: Detail[] = [
    { label: "IP", value: firewallCredentials.ip },
    { label: "Port", value: firewallCredentials.port },
  ];

  const { cusRouter } = selectedConnection;

  const cusRouterDetail: Detail[] = [
    { label: "Serial Number", value: cusRouter.asset.serialNumber },
    { label: "WAN IP Adress", value: cusRouter.wanIpAddress },
    { label: "LAN IP Pool", value: cusRouter.lanIpPool },
    { label: "Bandwidth", value: cusRouter.bandwidth },
    { label: "AS Number", value: cusRouter.asNumber },
    { label: "Ownership", value: cusRouter.ownership },
  ];

  const { customer } = selectedConnection;

  const customerDetails: Detail[] = [
    { label: "Name", value: customer.name },
    { label: "Priority", value: customer.priority },
    { label: "Contact Number", value: customer.contactNo },
    { label: "Email", value: customer.email },
    { label: "Address", value: customer.address },
    { label: "Account Manager", value: customer.accountManager.name },
    { label: "VSNL ID", value: customer.vsnlId },
  ];

  return (
    <Box pb="10px" pl="30px">
      {/* <ContainedButton  sx={{mt:"20px", mb:"20px", py:"5px"}}>Edit Connection</ContainedButton>
      <ContainedButton sx={{mt:"20px", mb:"20px", py:"5px", bgcolor:"error.main", ml:"10px"}}>Terminate Connection</ContainedButton> */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="30px"
      ></Box>
      <Box
        display="flex"
        gap="30px"
        maxHeight="calc(100dvh - 100px)"
        sx={{ overflowY: "scroll" }}
        pt="30px"
        pr="30px"
      >
        <Box width="100%" display="flex" flexDirection="column" gap="30px">
          <DetailSection
            label="Connection Details"
            labelSideCompo={
              <Box display="flex" alignItems="center" gap="10px">
                <IconButton
                  onClick={() => {
                    setIsConnectionFormOpen(true);
                    setConnectionFormType("connection");
                  }}
                >
                  <CiEdit />
                </IconButton>
                <Box
                  bgcolor={
                    selectedConnection.activeStatus
                      ? "success.light"
                      : "error.main"
                  }
                  borderRadius="5px"
                  p="2px"
                  px="10px"
                  color="white"
                  width="fit-content"
                  fontSize={fontSizes.xs}
                >
                  {selectedConnection.activeStatus ? "Active" : "Terminated"}
                </Box>
              </Box>
            }
            details={connectionDetails}
          />
          <DetailSection
            label="Last Mile Configuration"
            details={lastMileDetails}
            labelSideCompo={
              <IconButton onClick={() => setIsLastMileForm(true)}>
                <CiEdit />
              </IconButton>
            }
          />
          <DetailSection label="Customer Details" details={customerDetails} />
        </Box>
        <Box width="100%" display="flex" flexDirection="column" gap="30px">
          <DetailSection
            label="PE Router/Switch Details"
            details={peRouterDetails}
            labelSideCompo={
              <IconButton onClick={() => setIsPEFormOpen(true)}>
                <CiEdit />
              </IconButton>
            }
          />
          <DetailSection
            label="Customer Router Configuration"
            details={cusRouterDetail}
            labelSideCompo={
              <IconButton onClick={() => setIsCusRouterForm(true)}>
                <CiEdit />
              </IconButton>
            }
          />
          {selectedConnection.networkServiceType === NetworkServiceType.ILL && (
            <DetailSection
              label="Firewall Credentials"
              details={firewallCredentialDetail}
              labelSideCompo={
                <IconButton onClick={() => setIsFCFormOpen(true)}>
                  <CiEdit />
                </IconButton>
              }
            />
          )}
          <DetailSection
            label="Remarks"
            labelSideCompo={
              <IconButton
                onClick={() => {
                  setIsConnectionFormOpen(true);
                  setConnectionFormType("remark");
                }}
              >
                <CiEdit />
              </IconButton>
            }
          >
            {selectedConnection.remarks.split("\n").map((remark) => (
              <CustomTypography>
                {remark.length === 0 ? <br /> : remark}
              </CustomTypography>
            ))}
          </DetailSection>
        </Box>
      </Box>
      <PEConnectionUpdateForm
        open={isPEFormOpen}
        handleClose={() => {
          setIsPEFormOpen(false);
        }}
        peConnection={selectedConnection.peRouter}
      />
      <LastMileConnectionUpdateForm
        open={isLastMileForm}
        handleClose={() => setIsLastMileForm(false)}
        lastMileConnection={selectedConnection.lastMileConnection}
      />
      <CustomerRouterUpdateForm
        open={isCusRouterForm}
        handleClose={() => setIsCusRouterForm(false)}
        customerRouter={selectedConnection.cusRouter}
      />
      <FirewallCredentialsUpdateForm
        open={isFCFormOpen}
        handleClose={() => setIsFCFormOpen(false)}
        firewallCredentials={selectedConnection.firewallCredentials}
      />
      <ConnectionUpdateForm
        handleClose={() => setIsConnectionFormOpen(false)}
        type={connectionFormType}
        open={isConnectionFormOpen}
        connection={selectedConnection}
      />
    </Box>
  );
};

type DetailSectionPropType = {
  label: string;
  labelSideCompo?: ReactNode;
  details?: Detail[];
  children?: ReactNode;
};

type Detail = {
  label: string;
  value: string | string[] | null;
  hidden?: boolean;
};

const DetailSection = ({
  label,
  labelSideCompo,
  details,
  children,
}: DetailSectionPropType) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Box bgcolor="white" width="100%" p="20px" borderRadius="20px">
      <Box display="flex" alignItems="start" justifyContent="space-between">
        <CustomTypography
          mb="20px"
          fontSize={fontSizes.lg}
          fontWeight={fontWeights.xl}
        >
          {label}
        </CustomTypography>
        {labelSideCompo}
      </Box>
      <Box display="grid" gridTemplateColumns="auto auto auto" gap="10px">
        {details?.map(({ label, value, hidden }) => (
          <Box
            mb="20px"
            height="100%"
            bgcolor={lighten(useTheme().palette.secondary.main, 0.9)}
            color="white"
            p="10px"
            borderRadius="10px"
          >
            <CustomTypography
              fontColor={fontColors.secondary}
              fontSize={fontSizes.xs}
            >
              {label}
            </CustomTypography>
            {Array.isArray(value) ? (
              value.map((v) => (
                <CustomTypography fontWeight={fontWeights.xl}>
                  {v || "N/A"}
                </CustomTypography>
              ))
            ) : (
              <CustomTypography
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                fontSize={
                  value && value.length > 10 ? fontSizes.sm : fontSizes.md
                }
                fontWeight={fontWeights.xl}
              >
                {!isHover && hidden
                  ? value
                      ?.split("")
                      .map(() => "●")
                      .join("")
                  : value || "N/A"}
              </CustomTypography>
            )}
          </Box>
        ))}
      </Box>
      {children}
    </Box>
  );
};

export default ConnectionViewForm;
