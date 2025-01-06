import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../components/popup-dialog";
import AutoCompleteFormField from "../../../../components/textFields/AutoCompleteField";
import CreateableAutoComplete from "../../../../components/textFields/CreateableAutoComplete";
import FormField from "../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { locationListAction } from "../../../../redux/slices/inventory/locations/list";
import { manufacturerListAction } from "../../../../redux/slices/inventory/manufacturer/list";
import { modelListAction } from "../../../../redux/slices/inventory/model/list";
import {
  networkAssetCreateAction,
  networkAssetCreateReset,
} from "../../../../redux/slices/inventory/networkAssets/create";
import {
  networkAssetUpdateAction,
  networkAssetUpdateReset,
} from "../../../../redux/slices/inventory/networkAssets/update";
import { statusListAction } from "../../../../redux/slices/inventory/status/list";
import { typeListAction } from "../../../../redux/slices/inventory/type/list";
import { vendorSearchAction } from "../../../../redux/slices/inventory/vendor/list";
import { BasicInfo } from "../../../../types/common/BasicInfo";
import AssetType from "../../../../types/enums/AssetTypes";
import {
  NetworkAssetRequest,
  NetworkAssetResponse,
} from "../../../../types/Inventory/asset/NetworkAssets";

const initalForm: NetworkAssetRequest = {
  serialNumber: "",
  assetNumber: "",
  locationId: 0,
  vendorId: 0,
  statusId: 0,
  manufacturer: {
    id: null,
    name: "",
  },
  model: {
    id: null,
    name: "",
  },
  type: {
    id: null,
    name: "",
  },
};

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedNetworkAsset: NetworkAssetResponse | null;
  index: number;
};

const CreateUpdateForm = ({
  open,
  handleClose,
  selectedNetworkAsset,
  index,
}: PropTypes) => {
  const [networkAssetForm, setNetworkAssetForm] =
    useState<NetworkAssetRequest>(initalForm);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();
  const { data: locationList } = useAppSelector((state) => state.location.list);
  const { data: vendorList } = useAppSelector((state) => state.vendor.list);
  const { data: manufacturerList } = useAppSelector(
    (state) => state.manufacturer.list
  );
  const { data: modelList } = useAppSelector((state) => state.model.list);
  const { data: typeList } = useAppSelector((state) => state.type.list);
  const { data: statusList } = useAppSelector((state) => state.status.list);

  const { data: createdData, loading: createLoading } = useAppSelector(
    (state) => state.networkAssets.create
  );
  const { data: updatedData, loading: updateLoading } = useAppSelector(
    (state) => state.networkAssets.update
  );

  const loadRequiredLists = () => {
    dispatch(locationListAction());
    dispatch(manufacturerListAction(AssetType.NETWORK));
    dispatch(typeListAction(AssetType.NETWORK));
    dispatch(modelListAction(AssetType.NETWORK));
    dispatch(statusListAction(AssetType.NETWORK));
  };

  useEffect(() => {
    if (open) loadRequiredLists();
  }, [open]);

  useEffect(() => {
    if (!selectedNetworkAsset) return;
    setEditMode(true);

    const {
      assetNumber,
      location,
      manufacturer,
      model,
      serialNumber,
      status,
      type,
      vendor,
    } = selectedNetworkAsset;

    setNetworkAssetForm({
      assetNumber,
      manufacturer,
      model,
      serialNumber,
      type,
      vendorId: vendor.id,
      locationId: location.id,
      statusId: status.id || 0,
    });
  }, [selectedNetworkAsset]);

  useEffect(() => {
    if ((!createLoading && createdData) || (!updateLoading && updatedData)) {
      closeDialog();
    }
  }, [createLoading, createdData, updateLoading, updatedData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNetworkAssetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoCompleteChange = <T extends BasicInfo>(
    name: string,
    value: T | number | null
  ) => {
    setNetworkAssetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewValueChange = (field: string, value: string) => {
    handleAutoCompleteChange(field, {
      id: value.length > 0 ? 0 : null,
      name: value,
    });
  };

  const searchVendors = (name: string) => {
    dispatch(vendorSearchAction(name));
  };

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setNetworkAssetForm(initalForm);
      if (editMode) dispatch(networkAssetUpdateReset());
      else dispatch(networkAssetCreateReset());
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const handleSubmit = () => {
    if (editMode && selectedNetworkAsset)
      dispatch(
        networkAssetUpdateAction(
          selectedNetworkAsset.id,
          networkAssetForm,
          index
        )
      );
    else dispatch(networkAssetCreateAction(networkAssetForm));
  };

  const MANUFACTURER = "manufacturer";
  const TYPE = "type";
  const MODEL = "model";
  const formChildren = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <FormField
          label="Serial Number"
          name="serialNumber"
          onChange={handleChange}
          value={networkAssetForm.serialNumber}
        />
        <FormField
          label="Asset Number"
          name="assetNumber"
          onChange={handleChange}
          value={networkAssetForm.assetNumber}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <AutoCompleteFormField
          label="Location"
          options={locationList}
          optionLabel={(option) => option.name}
          value={
            locationList.find(
              (location) => location.id === networkAssetForm.locationId
            ) || null
          }
          onChange={(_, value) => {
            handleAutoCompleteChange("locationId", value?.id || null);
          }}
        />
        <AutoCompleteFormField
          label="Vendor"
          options={vendorList}
          optionLabel={(option) => option.name}
          value={
            vendorList.length === 0 && editMode && selectedNetworkAsset
              ? selectedNetworkAsset.vendor
              : vendorList.find(
                  (vendor) => vendor.id === networkAssetForm.vendorId
                ) || null
          }
          onChange={(_, value) => {
            handleAutoCompleteChange("vendorId", value?.id || null);
          }}
          onInputChange={(_, value) => searchVendors(value)}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <CreateableAutoComplete
          label="Manufacturer"
          options={manufacturerList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => handleAutoCompleteChange(MANUFACTURER, value)}
          onNewValueChange={(value) =>
            handleNewValueChange(MANUFACTURER, value)
          }
          value={networkAssetForm.manufacturer}
        />
        <CreateableAutoComplete
          label="Model"
          options={modelList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => handleAutoCompleteChange(MODEL, value)}
          onNewValueChange={(value) => handleNewValueChange(MODEL, value)}
          value={networkAssetForm.model}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <CreateableAutoComplete
          label="Type"
          options={typeList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => handleAutoCompleteChange(TYPE, value)}
          onNewValueChange={(value) => handleNewValueChange(TYPE, value)}
          value={networkAssetForm.type}
        />
        <AutoCompleteFormField
          label="Status"
          options={statusList}
          optionLabel={(option) => option.name}
          value={
            statusList.find(
              (status) => status.id === networkAssetForm.statusId
            ) || null
          }
          onChange={(_, value) => {
            handleAutoCompleteChange("statusId", value?.id || null);
          }}
        />
      </Box>
    </Box>
  );

  return (
    <PopupDialog
      open={open}
      handleClose={closeDialog}
      children={formChildren}
      title={editMode ? "Update Network Asset" : "Create Network Asset"}
      width={800}
      onClick={handleSubmit}
      loading={createLoading || updateLoading}
    />
  );
};

export default CreateUpdateForm;
