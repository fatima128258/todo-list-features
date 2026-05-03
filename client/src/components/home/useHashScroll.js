import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * When the URL hash (#faq, #contact) changes on the home page, scroll that section into view.
 */
export function useHashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !hash) return;
    const id = hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname, hash]);
}
