import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  branchListAction,
  branchListReset,
} from "../../../../../redux/slices/branch/list";
import {
  networkDeviceCreateAction,
  networkDeviceCreateReset,
} from "../../../../../redux/slices/network/device/create";
import {
  networkDeviceUpdateAction,
  networkDeviceUpdateReset,
} from "../../../../../redux/slices/network/device/update";
import {
  networkDeviceManufacturerListAction,
  networkDeviceManufacturerListReset,
} from "../../../../../redux/slices/network/manufacturer/list";
import {
  networkDeviceModelListAction,
  networkDeviceModelListReset,
} from "../../../../../redux/slices/network/model/list";
import {
  networkDeviceStatusListAction,
  networkDeviceStatusListReset,
} from "../../../../../redux/slices/network/status/list";
import {
  networkDeviceTypeListAction,
  networkDeviceTypeListReset,
} from "../../../../../redux/slices/network/type/list";
import {
  vendorListAction,
  vendorListReset,
} from "../../../../../redux/slices/vendor/list";
import {
  NetworkDeviceRequest,
  NetworkDeviceResponse,
} from "../../../../../types/NetworkDevice";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedDevice: NetworkDeviceResponse | null;
  index: number;
};

const initialFormState: NetworkDeviceRequest = {
  serialNumber: "",
  quantity: 0,
  branchId: 0,
  manufacturerId: 0,
  vendorId: 0,
  modelId: 0,
  statusId: 0,
  typeId: 0,
};

const NetworkDeviceForm = ({
  open,
  handleClose,
  selectedDevice,
  index,
}: PropTypes) => {
  const [networkDeviceForm, setNetworkDeviceForm] =
    useState<NetworkDeviceRequest>(initialFormState);
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { data: createdData, loading: createLoading } = useAppSelector(
    (state) => state.networkDevice.create
  );
  const { data: updatedData, loading: updateLoading } = useAppSelector(
    (state) => state.networkDevice.update
  );
  const { data: branchList } = useAppSelector((state) => state.branch.list);
  const { data: manufacturersList } = useAppSelector(
    (state) => state.networkDeviceManufacturer.list
  );
  const { data: vendorList } = useAppSelector((state) => state.vendor.list);
  const { data: modelList } = useAppSelector(
    (state) => state.networkDeviceModel.list
  );
  const { data: statusList } = useAppSelector(
    (state) => state.networkDeviceStatus.list
  );
  const { data: typeList } = useAppSelector(
    (state) => state.networkDeviceType.list
  );

  const fetchRequiredLists = () => {
    dispatch(branchListAction());
    dispatch(networkDeviceManufacturerListAction());
    dispatch(vendorListAction());
    dispatch(networkDeviceModelListAction());
    dispatch(networkDeviceStatusListAction());
    dispatch(networkDeviceTypeListAction());
  };

  const resetRequiredListStates = () => {
    dispatch(branchListReset());
    dispatch(networkDeviceManufacturerListReset());
    dispatch(vendorListReset());
    dispatch(networkDeviceModelListReset());
    dispatch(networkDeviceStatusListReset());
    dispatch(networkDeviceTypeListReset());
  };

  useEffect(() => {
    fetchRequiredLists();

    return () => {
      resetRequiredListStates();
    }
  },[]);


  useEffect(() => {
    if ((createdData && !createLoading) || (updatedData && !updateLoading))
      closeDialog();
  }, [createdData, createLoading, updatedData, updateLoading]);

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setNetworkDeviceForm(initialFormState);
      if (editMode) dispatch(networkDeviceUpdateReset());
      else dispatch(networkDeviceCreateReset());
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const handleSubmit = () => {
    if (editMode && selectedDevice)
      dispatch(
        networkDeviceUpdateAction(selectedDevice.id, networkDeviceForm, index)
      );
    else dispatch(networkDeviceCreateAction(networkDeviceForm));
  };

  const onTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNetworkDeviceForm((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteFieldChange = (name: string, value: number) => {
    setNetworkDeviceForm((prev) => ({ ...prev, [name]: value }));
  };

  const formChildren = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        gap={3}
      >
        <FormField
          label="Device serial number"
          name="serialNumber"
          onChange={onTextFieldChange}
          value={networkDeviceForm.serialNumber}
        />
        <FormField
          label="Quantitiy"
          name="quantity"
          onChange={onTextFieldChange}
          value={String(networkDeviceForm.quantity)}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        gap={3}
      >
        <AutoCompleteFormField
          label="Device Type"
          options={typeList}
          optionLabel={(option) => option.name}
          value={
            typeList.find((type) => type.id === networkDeviceForm.typeId) ||
            null
          }
          onChange={(_, value) =>
            onAutoCompleteFieldChange("typeId", Number(value?.id))
          }
        />
        <AutoCompleteFormField
          label="Device Model"
          options={modelList}
          optionLabel={(option) => option.name}
          value={
            modelList.find(
              (model) => model.id === networkDeviceForm.modelId
            ) || null
          }
          onChange={(_, value) =>
            onAutoCompleteFieldChange("modelId", Number(value?.id))
          }
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        gap={3}
      >
        <AutoCompleteFormField
          label="Device Manufacturer"
          options={manufacturersList}
          optionLabel={(option) => option.name}
          value={
            manufacturersList.find(
              (manufacturer) => manufacturer.id === networkDeviceForm.manufacturerId
            ) || null
          }
          onChange={(_, value) =>
            onAutoCompleteFieldChange("manufacturerId", Number(value?.id))
          }
        />
        <AutoCompleteFormField
          label="Device Status"
          options={statusList}
          optionLabel={(option) => option.name}
          value={
            statusList.find(
              (status) => status.id === networkDeviceForm.statusId
            ) || null
          }
          onChange={(_, value) =>
            onAutoCompleteFieldChange("statusId", Number(value?.id))
          }
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        gap={3}
      >
        <AutoCompleteFormField
          label="Branch"
          options={branchList}
          optionLabel={(option) => option.name}
          value={
            branchList.find(
              (branch) => branch.id === networkDeviceForm.branchId
            ) || null
          }
          onChange={(_, value) =>
            onAutoCompleteFieldChange("branchId", Number(value?.id))
          }
        />
        <AutoCompleteFormField
          label="Vendor"
          options={vendorList}
          optionLabel={(option) => option.name}
          value={
            vendorList.find(
              (vendor) => vendor.id === networkDeviceForm.vendorId
            ) || null
          }
          onChange={(_, value) =>
            onAutoCompleteFieldChange("vendorId", Number(value?.id))
          }
        />
      </Box>
    </Box>
  );

  return (
    <PopupDialog
      handleClose={closeDialog}
      loading={createLoading || updateLoading}
      open={open}
      width={500}
      title={editMode ? "Update device" : "Create new device"}
      onClick={handleSubmit}
      children={formChildren}
    />
  );
};

export default NetworkDeviceForm;
