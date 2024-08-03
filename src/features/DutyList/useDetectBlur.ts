import { useEffect, useState } from "react";

function useDetectBlur(
  ref: React.RefObject<HTMLFormElement>,
  shouldDetect: boolean
) {
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    function handleClickAway(event: MouseEvent) {
      if (ref?.current && !ref?.current.contains(event.target as Node)) {
        setIsBlur(true);
      }
    }

    if (shouldDetect) {
      document.addEventListener("mousedown", handleClickAway);
    } else {
      document.removeEventListener("mousedown", handleClickAway);
      setIsBlur(false);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      setIsBlur(false);
    };
  }, [ref, shouldDetect]);

  return {
    isBlur,
  };
}

export { useDetectBlur };
