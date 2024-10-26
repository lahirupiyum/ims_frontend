import NetowrkDeviceTypeForm from "./type";

export enum FormTypes {
    device = "device",
    model = "model",
    manufacturer = "manufacturer",
    type = "type"
  }

type PropTypes = {
    formType: FormTypes | null,
    handleClose: () => void
}
const FormHandler = ({formType, handleClose} : PropTypes) => {
    switch(formType) {
        case FormTypes.type:
            return <NetowrkDeviceTypeForm handleClose={handleClose} index={-1} open={formType === FormTypes.type} selectedType={null} />
        case FormTypes.manufacturer:
            return null;
        case FormTypes.device:
            return null;
        case FormTypes.model:
            return null;
        default:
            return null;
    }
}


export default FormHandler;