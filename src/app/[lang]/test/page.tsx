"use client";
import React, { useEffect } from "react";
import Script from "next/script";

const Page = () => {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { PageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);
  return <div>
     {/* Google Translate */}
    <Script
     src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    ></Script>
{/* Google Translate CSS */}
    <link
     rel="stylesheet"
     type="text/css"
     href="https://www.gstatic.com/_/translate_http/_/ss/k=translate_http.tr.26tY-h6gH9w.L.W.O/am=CAM/d=0/rs=AN8SPfpIXxhebB2A47D9J-MACsXmFF6Vew/m=el_main_css"
    />
        <div id="google_translate_element" style={{ position: 'fixed', right: 0, top: 100, zIndex: 1000, backgroundColor:'rgba(255, 255, 255, 0.7)', borderRadius:'10px', padding:'5px' }}></div>
<div>
    hello world
</div>
</div>;
};

export default Page;
