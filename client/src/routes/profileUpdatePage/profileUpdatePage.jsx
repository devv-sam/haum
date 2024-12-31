import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData);

    // Concatenate first and last names
    const fullName = `${updates.fname} ${updates.lname}`;

    // Only include fields that have been filled out
    const cleanedUpdates = Object.entries(updates).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      { name: fullName, avatar: avatar[0] }
    );

    try {
      if (!currentUser?.id) {
        throw new Error("No user ID found. Please log in again.");
      }

      const res = await apiRequest.put(
        `/users/${currentUser.id}`,
        cleanedUpdates
      );

      if (res.data) {
        // Merge the new data with existing user data
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
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="name">Name</label>
            <div className="flex">
              <input
                id="fname"
                name="fname"
                type="text"
                defaultValue={currentUser.fname}
              />
              <input
                id="lname"
                name="lname"
                type="text"
                defaultValue={currentUser.lname}
              />
            </div>
          </div>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt="Profile avatar"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dpwr2insh",
            uploadPreset: "estate",
            multiple: false,
            maxImageSize: 20000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
