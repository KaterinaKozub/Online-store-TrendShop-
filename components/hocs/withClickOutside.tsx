import { useClickOutside } from "@/hooks/useClickOutside";
import { IWrappedComponentProps } from "@/types/hocs";
import { ForwardRefExoticComponent, RefAttributes, useEffect, useRef, useState } from "react";

export function withClickOutside(
  WrappedComponent: ForwardRefExoticComponent<IWrappedComponentProps & RefAttributes<HTMLDivElement>>
) {
  return function Component() {
    const {open, setOpen, ref} = useClickOutside()

    return <WrappedComponent  open={open} setOpen={setOpen} ref={ref} />;
  };
}
