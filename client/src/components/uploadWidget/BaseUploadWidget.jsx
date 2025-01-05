import React, { useState, useEffect, createContext } from "react";

const CloudinaryScriptContext = createContext();

const BaseUploadWidget = ({ uwConfig, onImageUpload }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            onImageUpload(result.info.secure_url);
          }
        }
      );
      myWidget.open();
    }
  };

  return { loaded, initializeCloudinaryWidget };
};

export default BaseUploadWidget;
