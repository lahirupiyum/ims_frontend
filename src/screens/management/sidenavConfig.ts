import { ElementType } from "react";
import { IconType } from "react-icons";

interface SidenavElement {
  label: string;
  contextPath: string;
  component: ElementType;
  icon: {
    default: IconType;
    selected: IconType;
  };
}

export default interface SidenavParent {
  title: string;
  elements: SidenavElement[];
}
