"use client";

import { useState, useEffect } from "react";

/**
 * A hook that detects if the current device is a mobile device
 * based on screen width or user agent (if available)
 * @param breakpoint The breakpoint to consider as mobile (default: 768px)
 * @returns A boolean indicating if the current device is a mobile device
 */
export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return;

    // Function to check if device is mobile
    const checkMobile = () => {
      // Check screen width
      const isMobileByWidth = window.innerWidth < breakpoint;

      // Check user agent as fallback
      const isMobileByUserAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsMobile(isMobileByWidth || isMobileByUserAgent);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export default useMobile;
