import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { peRouterPageAction } from "../../../../redux/slices/customer/perouter/page";
import { PERouterResponse } from "../../../../types/customer/PERouter";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "port", label: "Port", minWidth: 50 },
  { id: "ip", label: "IP", minWidth: 50 },
  { id: "wanIpPool", label: "WAN IP Pool", minWidth: 50 },
  { id: "routerAssetNumber", label: "Router Asset Number", minWidth: 50 },
  { id: "switchAssetNumber", label: "Switch Asset Number", minWidth: 50 },
  { id: "switchPort", label: "Switch Port", minWidth: 50 },
];

const PERouter = () => {
  const peRouterPageState = useAppSelector((state) => state.peRouter.page);

  const rowsFormatter = (rows: PERouterResponse[]) =>
    rows.map((row, index) => {
      const {
        id,
        name,
        port,
        ip,
        wanIpPool,
        switchPort,
        asset,
        networkSwitch,
      } = row;
      const { assetNumber: routerAssetNumber } = asset;
      const { assetNumber: switchAssetNumber } = networkSwitch;

      return {
        actions: wrapActionButtons([
          actionButton(ActionIcontype.edit, () => {}, 1),
          actionButton(ActionIcontype.delete, () => {}, 2),
        ]),
        name,
        port,
        ip,
        wanIpPool,
        routerAssetNumber,
        switchAssetNumber,
        switchPort,
      };
    });

  return (
    <>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={peRouterPageState}
        pageAction={peRouterPageAction}
      />
    </>
  );
};

export default PERouter;
