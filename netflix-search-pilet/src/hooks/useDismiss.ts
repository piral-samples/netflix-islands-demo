import * as React from "react";

/**
 * Hook that executes a function when clicked outside the provided ref or
 * navigating away
 */
const useDismiss = (
  onClickOutside: () => void,
  ref: React.MutableRefObject<any>
) => {
  //Clicking outside the element
  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);

  React.useEffect(onClickOutside, []);
};

export default useDismiss;
