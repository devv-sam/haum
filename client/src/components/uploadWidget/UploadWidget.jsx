import React, { useState, useEffect, createContext } from "react";
import { Plus, X } from "lucide-react";

const CloudinaryScriptContext = createContext();

const PropertyImageUpload = ({ uwConfig, setState, images }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

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
        {
          ...uwConfig,
          maxFiles: 4,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setState((prev) => {
              if (prev.length >= 4) {
                return prev;
              }
              const newImages = [...prev, result.info.secure_url];
              setError(
                newImages.length < 3 ? "Please upload at least 3 images" : ""
              );
              return newImages;
            });
          }
        }
      );
      myWidget.open();
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    setState((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToDelete);
      setError(newImages.length < 3 ? "Please upload at least 3 images" : "");
      return newImages;
    });
  };

  const ImageWithDelete = ({ src, index, isMain }) => (
    <div className="relative group">
      <img
        src={src}
        alt={`Property ${index + 1}`}
        className={`w-full ${
          isMain ? "h-96" : "h-full"
        } object-cover rounded-lg`}
      />
      <button
        onClick={() => handleDeleteImage(index)}
        className="absolute top-2 right-2 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </div>
  );

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Unit Images</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="grid grid-cols-3 gap-4">
          {/* Main large image */}
          {images.length > 0 && (
            <div className="col-span-3">
              <ImageWithDelete src={images[0]} index={0} isMain={true} />
            </div>
          )}

          {/* Smaller images */}
          {images.slice(1).map((image, index) => (
            <div key={index} className="aspect-square">
              <ImageWithDelete src={image} index={index + 1} isMain={false} />
            </div>
          ))}

          {/* Upload button */}
          {images.length < 4 && (
            <button
              onClick={initializeCloudinaryWidget}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg aspect-square hover:border-gray-400 transition-colors"
            >
              <Plus className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Add Property Image
              </span>
            </button>
          )}
        </div>
      </div>
    </CloudinaryScriptContext.Provider>
  );
};

export default PropertyImageUpload;
