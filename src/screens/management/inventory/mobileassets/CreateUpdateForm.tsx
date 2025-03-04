import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../components/popup-dialog";
import AutoCompleteFormField from "../../../../components/textFields/AutoCompleteField";
import CreateableAutoComplete from "../../../../components/textFields/CreateableAutoComplete";
import FormField from "../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { employeeListAction } from "../../../../redux/slices/inventory/employee/list";
import { locationListAction } from "../../../../redux/slices/inventory/locations/list";
import { manufacturerListAction } from "../../../../redux/slices/inventory/manufacturer/list";
import { mobileAssetCreateAction } from "../../../../redux/slices/inventory/mobileAssets/create";
import { mobileAssetUpdateAction } from "../../../../redux/slices/inventory/mobileAssets/update";
import { modelListAction } from "../../../../redux/slices/inventory/model/list";
import { statusListAction } from "../../../../redux/slices/inventory/status/list";
import { typeListAction } from "../../../../redux/slices/inventory/type/list";
import { vendorListAction } from "../../../../redux/slices/inventory/vendor/list";
import { BasicInfo } from "../../../../types/common/BasicInfo";
import AssetType from "../../../../types/enums/AssetTypes";
import {
  MobileAssetRequest,
  MobileAssetResponse,
} from "../../../../types/Inventory/asset/ModileAssets";

const initalForm: MobileAssetRequest = {
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
  employee: {
    id: null,
    name: "",
  },
  warrantyExpireDate: new Date().getTime(),
  purchaseDate: new Date().getTime(),
  invoiceNumber: "",
};

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedMobileAsset: MobileAssetResponse | null;
  index: number;
};

const CreateUpdateForm = ({
  open,
  handleClose,
  selectedMobileAsset,
  index,
}: PropTypes) => {
  const [mobileAssetForm, setMobileAssetForm] =
    useState<MobileAssetRequest>(initalForm);
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
  const { data: employeeList } = useAppSelector((state) => state.employee.list);

  const { data: createdData, loading: createLoading } = useAppSelector(
    (state) => state.mobileAssets.create
  );
  const { data: updatedData, loading: updateLoading } = useAppSelector(
    (state) => state.mobileAssets.update
  );

  const loadRequiredLists = () => {
    dispatch(locationListAction());
    dispatch(manufacturerListAction(AssetType.MOBILE));
    dispatch(typeListAction(AssetType.MOBILE));
    dispatch(modelListAction(AssetType.MOBILE));
    dispatch(statusListAction(AssetType.MOBILE));
    dispatch(vendorListAction());
    dispatch(employeeListAction());
  };

  useEffect(() => {
    if (open) loadRequiredLists();
  }, [open]);

  useEffect(() => {
    if (!selectedMobileAsset) return;
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
      employee,
      warrantyExpireDate,
      purchaseDate,
      invoiceNumber,
    } = selectedMobileAsset;

    setMobileAssetForm({
      assetNumber,
      manufacturer,
      model,
      serialNumber,
      type,
      vendorId: vendor.id,
      locationId: location.id,
      statusId: status.id || 0,
      employee: employee,
      warrantyExpireDate,
      purchaseDate,
      invoiceNumber,
    });
  }, [selectedMobileAsset]);

  useEffect(() => {
    if ((!createLoading && createdData) || (!updateLoading && updatedData)) {
      closeDialog();
    }
  }, [createLoading, createdData, updateLoading, updatedData]);

  useEffect(() => {
    console.log("Mobile asset form", mobileAssetForm);
  }, [mobileAssetForm]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "purchaseDate" || name === "warrantyExpireDate")
      console.log("Badu wada");

    setMobileAssetForm((prev) => ({
      ...prev,
      [name]: Number(new Date(value).getTime()),
    }));

    setMobileAssetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoCompleteChange = <T extends BasicInfo>(
    name: string,
    value: T | number | null
  ) => {
    setMobileAssetForm((prev) => ({ ...prev, [name]: value }));
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
      setMobileAssetForm(initalForm);
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const handleSubmit = () => {
    if (editMode && selectedMobileAsset)
      dispatch(
        mobileAssetUpdateAction(selectedMobileAsset.id, mobileAssetForm, index)
      );
    else dispatch(mobileAssetCreateAction(mobileAssetForm));
  };

  const MANUFACTURER = "manufacturer";
  const TYPE = "type";
  const MODEL = "model";
  const ASSIGNED_TO = "employee";
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
          value={mobileAssetForm.serialNumber}
        />
        <FormField
          label="Asset Number"
          name="assetNumber"
          onChange={handleChange}
          value={mobileAssetForm.assetNumber}
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
              (location) => location.id === mobileAssetForm.locationId
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
            vendorList.length === 0 && editMode && selectedMobileAsset
              ? selectedMobileAsset.vendor
              : vendorList.find(
                  (vendor) => vendor.id === mobileAssetForm.vendorId
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
          value={mobileAssetForm.manufacturer}
        />
        <CreateableAutoComplete
          label="Model"
          options={modelList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => handleAutoCompleteChange(MODEL, value)}
          onNewValueChange={(value) => handleNewValueChange(MODEL, value)}
          value={mobileAssetForm.model}
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
          value={mobileAssetForm.type}
        />
        <AutoCompleteFormField
          label="Status"
          options={statusList}
          optionLabel={(option) => option.name}
          value={
            statusList.find(
              (status) => status.id === mobileAssetForm.statusId
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
        <CreateableAutoComplete
          label="Assigned To"
          options={employeeList} // Add options for employees
          optionLabel={(option) => option.name}
          onChange={(_, value) => handleAutoCompleteChange(ASSIGNED_TO, value)}
          onNewValueChange={(value) => handleNewValueChange(ASSIGNED_TO, value)}
          value={mobileAssetForm.employee}
        />
        <FormField
          label="Warranty Expire Date"
          name="warrantyExpireDate"
          onChange={handleChange}
          value={new Date(mobileAssetForm.warrantyExpireDate)
            .toISOString()
            .substring(0, 10)}
          type="date"
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
          value={new Date(mobileAssetForm.purchaseDate)
            .toISOString()
            .substring(0, 10)}
          type="date"
        />
        <FormField
          label="Invoice Number"
          name="invoiceNumber"
          onChange={handleChange}
          value={mobileAssetForm.invoiceNumber}
        />
      </Box>
    </Box>
  );

  return (
    <PopupDialog
      open={open}
      handleClose={closeDialog}
      children={formChildren}
      title={editMode ? "Update Mobile Asset" : "Create Mobile Asset"}
      width={800}
      onClick={handleSubmit}
      loading={createLoading || updateLoading}
    />
  );
};

export default CreateUpdateForm;
