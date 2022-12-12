import Guider from "@core/index";
import { useEffect, useRef } from "react";

const useGuider = () => {
  const guider = useRef<Guider>();

  useEffect(() => {
    guider.current = new Guider({});
  }, []);
};

export default useGuider;
