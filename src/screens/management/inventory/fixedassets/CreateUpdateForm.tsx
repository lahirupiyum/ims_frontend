import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../components/popup-dialog";
import AutoCompleteFormField from "../../../../components/textFields/AutoCompleteField";
import CreateableAutoComplete from "../../../../components/textFields/CreateableAutoComplete";
import FormField from "../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fixedAssetCreateAction } from "../../../../redux/slices/inventory/fixedAssets/create";
import { fixedAssetUpdateAction } from "../../../../redux/slices/inventory/fixedAssets/update";
import { locationListAction } from "../../../../redux/slices/inventory/locations/list";
import { manufacturerListAction } from "../../../../redux/slices/inventory/manufacturer/list";
import { modelListAction } from "../../../../redux/slices/inventory/model/list";
import { networkAssetCreateReset } from "../../../../redux/slices/inventory/networkAssets/create";
import { networkAssetUpdateReset } from "../../../../redux/slices/inventory/networkAssets/update";
import { statusListAction } from "../../../../redux/slices/inventory/status/list";
import { typeListAction } from "../../../../redux/slices/inventory/type/list";
import { vendorListAction } from "../../../../redux/slices/inventory/vendor/list";
import { BasicInfo } from "../../../../types/common/BasicInfo";
import AssetType from "../../../../types/enums/AssetTypes";
import {
  FixedAssetRequest,
  FixedAssetResponse,
} from "../../../../types/Inventory/asset/FixedAssets";

const initalForm: FixedAssetRequest = {
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
  deprecationInfo: "",
  invoiceNumber: "",
  purchaseDate: new Date().getTime(),
};

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedFixedAsset: FixedAssetResponse | null;
  index: number;
};

const CreateUpdateForm = ({
  open,
  handleClose,
  selectedFixedAsset,
  index,
}: PropTypes) => {
  const [fixedAssetForm, setFixedAssetForm] =
    useState<FixedAssetRequest>(initalForm);
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
    dispatch(manufacturerListAction(AssetType.FIXED));
    dispatch(typeListAction(AssetType.FIXED));
    dispatch(modelListAction(AssetType.FIXED));
    dispatch(statusListAction(AssetType.FIXED));
    dispatch(vendorListAction());
  };

  useEffect(() => {
    if (open) loadRequiredLists();
  }, [open]);

  useEffect(() => {
    if (!selectedFixedAsset) return;
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
      deprecationInfo,
      invoiceNumber,
      purchaseDate,
    } = selectedFixedAsset;

    setFixedAssetForm({
      assetNumber,
      manufacturer,
      model,
      serialNumber,
      type,
      vendorId: vendor.id,
      locationId: location.id,
      statusId: status.id || 0,
      deprecationInfo,
      invoiceNumber,
      purchaseDate,
    });
  }, [selectedFixedAsset]);

  useEffect(() => {
    if ((!createLoading && createdData) || (!updateLoading && updatedData)) {
      closeDialog();
    }
  }, [createLoading, createdData, updateLoading, updatedData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "purchaseDate")
      setFixedAssetForm((prev) => ({
        ...prev,
        purchaseDate: new Date(value).getTime(),
      }));

    setFixedAssetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoCompleteChange = <T extends BasicInfo>(
    name: string,
    value: T | number | null
  ) => {
    setFixedAssetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewValueChange = (field: string, value: string) => {
    handleAutoCompleteChange(field, {
      id: value.length > 0 ? 0 : null,
      name: value,
    });
  };

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setFixedAssetForm(initalForm);
      if (editMode) dispatch(networkAssetUpdateReset());
      else dispatch(networkAssetCreateReset());
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const handleSubmit = () => {
    if (editMode && selectedFixedAsset)
      dispatch(
        fixedAssetUpdateAction(selectedFixedAsset.id, fixedAssetForm, index)
      );
    else dispatch(fixedAssetCreateAction(fixedAssetForm));
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
          value={fixedAssetForm.serialNumber}
        />
        <FormField
          label="Asset Number"
          name="assetNumber"
          onChange={handleChange}
          value={fixedAssetForm.assetNumber}
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
              (location) => location.id === fixedAssetForm.locationId
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
            vendorList.length === 0 && editMode && selectedFixedAsset
              ? selectedFixedAsset.vendor
              : vendorList.find(
                  (vendor) => vendor.id === fixedAssetForm.vendorId
                ) || null
          }
          onChange={(_, value) => {
            handleAutoCompleteChange("vendorId", value?.id || null);
          }}
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
          value={fixedAssetForm.manufacturer}
        />
        <CreateableAutoComplete
          label="Model"
          options={modelList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => handleAutoCompleteChange(MODEL, value)}
          onNewValueChange={(value) => handleNewValueChange(MODEL, value)}
          value={fixedAssetForm.model}
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
          value={fixedAssetForm.type}
        />
        <AutoCompleteFormField
          label="Status"
          options={statusList}
          optionLabel={(option) => option.name}
          value={
            statusList.find(
              (status) => status.id === fixedAssetForm.statusId
            ) || null
          }
          onChange={(_, value) => {
            handleAutoCompleteChange("statusId", value?.id || null);
          }}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <FormField
          label="Purchase Date"
          name="purchaseDate"
          onChange={handleChange}
          value={new Date(fixedAssetForm.purchaseDate)
            .toISOString()
            .substring(0, 10)}
          type="date"
        />
        <FormField
          label="Invoice Number"
          name="invoiceNumber"
          onChange={handleChange}
          value={fixedAssetForm.invoiceNumber}
        />
      </Box>
      <FormField
        label="Deprecation Info"
        name="deprecationInfo"
        onChange={handleChange}
        value={fixedAssetForm.deprecationInfo}
        multiline
        rows={4}
      />
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
