import { IconType } from "react-icons";

interface SidenavElement {
  label: string;
  contextPath: string;
  icon: {
    default: IconType;
    selected: IconType;
  };
}

export default interface SidenavParent {
  title: string;
  elements: SidenavElement[];
}
