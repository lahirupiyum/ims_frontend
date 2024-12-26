import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { cusRouterPageAction } from "../../../../redux/slices/customer/cusrouter/page";
import { CusRouterRespone } from "../../../../types/customer/CusRouter";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "wanPort", label: "WAN Port", minWidth: 50 },
  { id: "lanPort", label: "LAN Port", minWidth: 50 },
  { id: "bandwidth", label: "Bandwidth (Mbps)", minWidth: 50 },
  { id: "wanIpPool", label: "WAN IP Pool", minWidth: 50 },
  { id: "lanIpPool", label: "LAN IP Pool", minWidth: 50 },
  { id: "assetNumber", label: "Asset Number", minWidth: 50 },
];

const CusRouter = () => {
  const cusRouterPageState = useAppSelector((state) => state.cusRouter.page);

  const rowsFormatter = (rows: CusRouterRespone[]) =>
    rows.map((row, index) => {
      const { id, wanPort, wanIpPool, lanPort, bandwidth, lanIpPool, asset } =
        row;
      const { assetNumber } = asset;

      return {
        actions: wrapActionButtons([
          actionButton(ActionIcontype.edit, () => {}, 1),
          actionButton(ActionIcontype.delete, () => {}, 2),
        ]),
        wanPort,
        lanPort,
        bandwidth,
        wanIpPool,
        lanIpPool,
        assetNumber,
      };
    });

  return (
    <>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={cusRouterPageState}
        pageAction={cusRouterPageAction}
      />
    </>
  );
};

export default CusRouter;
