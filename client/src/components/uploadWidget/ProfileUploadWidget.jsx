import { Camera } from "lucide-react";
import BaseUploadWidget from "./BaseUploadWidget";

const ProfileImageUpload = ({ uwConfig, setState, currentAvatar }) => {
  const { loaded, initializeCloudinaryWidget } = BaseUploadWidget({
    uwConfig: {
      ...uwConfig,
      multiple: false,
      maxFiles: 1,
    },
    onImageUpload: (imageUrl) => {
      setState(imageUrl);
    },
  });

  return (
    <div className="space-y-4">
      <div className="relative w-32 h-32 mx-auto">
        <img
          src={currentAvatar || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
        <button
          onClick={initializeCloudinaryWidget}
          disabled={!loaded}
          className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
