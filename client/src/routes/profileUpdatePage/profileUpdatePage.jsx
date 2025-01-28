import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import ProfileImageUpload from "../../components/uploadWidget/ProfileUploadWidget.jsx";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, lastName] = currentUser?.name?.split(" ") || ["", ""];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData);

    const cleanedUpdates = {
      ...(updates.fname || updates.lname
        ? {
            name: `${updates.fname || firstName} ${
              updates.lname || lastName
            }`.trim(),
          }
        : {}),

      ...(updates.username !== undefined && { username: updates.username }),
      ...(updates.email !== undefined && { email: updates.email }),
      ...(updates.password && { password: updates.password }),
      ...(avatar.length > 0 && { avatar: avatar[0] }), // Ensure avatar is passed correctly
    };

    try {
      if (!currentUser?.id) {
        throw new Error("No user ID found. Please log in again.");
      }

      if (Object.keys(cleanedUpdates).length === 0) {
        setError("No changes detected");
        setIsLoading(false);
        return;
      }

      const res = await apiRequest.put(
        `/api/users/${currentUser.id}`,
        cleanedUpdates
      );

      if (res.data) {
        const updatedUser = { ...currentUser, ...res.data };
        updateUser(updatedUser);
        navigate("/profile");
      } else {
        throw new Error("No data received from server");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while updating your profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return <div>Please log in to update your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8">
      {/* Form Section */}
      <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fname"
                className="block text-gray-600 font-medium"
              >
                First Name
              </label>
              <input
                id="fname"
                name="fname"
                type="text"
                defaultValue={firstName}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="lname"
                className="block text-gray-600 font-medium"
              >
                Last Name
              </label>
              <input
                id="lname"
                name="lname"
                type="text"
                defaultValue={lastName}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-600 font-medium"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a new password (optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </form>
      </div>

      {/* Avatar Section */}
      <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Profile Picture
        </h2>
        <div className="relative inline-block">
          <img
            src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
            alt="Profile avatar"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <div className="absolute bottom-4 right-0">
            <ProfileImageUpload
              uwConfig={{
                cloudName: "dpwr2insh",
                uploadPreset: "estate",
                maxImageSize: 2000000,
                folder: "avatars",
              }}
              setState={setAvatar}
              currentAvatar={currentUser.avatar}
            />
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">Max size: 2MB</p>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
