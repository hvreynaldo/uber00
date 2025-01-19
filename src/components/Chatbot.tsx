import React, { useEffect } from 'react';

declare global {
  interface Window {
    VG_CONFIG?: {
      ID: string;
      region: string;
      render: string;
      stylesheets: string[];
    };
    VG_SCRIPT?: HTMLScriptElement;
  }
}

export function Chatbot() {
  useEffect(() => {
    // Initialize TIXAE Agents
    window.VG_CONFIG = {
      ID: "vTIa6aQmYKyH4qw",
      region: 'na',
      render: 'bottom-right',
      stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
      ],
    };

    const script = document.createElement("script");
    script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.VG_CONFIG;
      delete window.VG_SCRIPT;
    };
  }, []);

  return <div id="VG_OVERLAY_CONTAINER" style={{ width: 0, height: 0 }} />;
}