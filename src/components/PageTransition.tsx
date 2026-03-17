import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionState("exit");
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionState("enter");
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [children, location.pathname]);

  return (
    <div
      className={`page-transition ${
        transitionState === "enter" ? "page-enter" : "page-exit"
      }`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
