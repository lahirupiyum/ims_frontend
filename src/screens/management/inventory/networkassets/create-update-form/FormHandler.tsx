import NetworkDeviceForm from "./device";
import NetowrkDeviceManufacturerForm from "./manufacturer";
import NetworkDeviceModelForm from "./model";
import NetowrkDeviceTypeForm from "./type";

export enum FormTypes {
  device = "device",
  model = "model",
  manufacturer = "manufacturer",
  type = "type",
}

type PropTypes = {
  formType: FormTypes | null;
  handleClose: () => void;
};
const FormHandler = ({ formType, handleClose }: PropTypes) => {
  switch (formType) {
    case FormTypes.type:
      return (
        <NetowrkDeviceTypeForm
          handleClose={handleClose}
          index={-1}
          open={formType === FormTypes.type}
          selectedType={null}
        />
      );
    case FormTypes.manufacturer:
      return (
        <NetowrkDeviceManufacturerForm
          handleClose={handleClose}
          index={-1}
          open={formType === FormTypes.manufacturer}
          selectedManufacturer={null}
        />
      );
    case FormTypes.device:
      return (
        <NetworkDeviceForm
          handleClose={handleClose}
          index={-1}
          open={formType === FormTypes.device}
          selectedDevice={null}
        />
      );
    case FormTypes.model:
      return (
        <NetworkDeviceModelForm
          handleClose={handleClose}
          index={-1}
          open={formType === FormTypes.model}
          selectedModel={null}
        />
      );
    default:
      return null;
  }
};

export default FormHandler;
