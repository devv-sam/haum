import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    // Ensure the delisting period is an integer and handle default cases
    const delistingPeriodInHours = parseInt(inputs.delistingPeriod) || 0;

    // Calculate the delisting date based on the period
    const delistingDate = new Date();
    delistingDate.setHours(delistingDate.getHours() + delistingPeriodInHours);

    try {
      // Sending the post data along with the calculated delistingDate
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          images: images,
          delistingDate: delistingDate.toISOString(), // Add delistingDate here
        },
        postDetail: {
          desc: value,
          tokensrem: inputs.tokensrem,
          size: parseInt(inputs.size),
          delistingDate: delistingDate.toISOString(), // Add delistingDate here as well
        },
      });

      // Redirect to the post details page after submission
      navigate("/" + res.data.id);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Form Section */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-gray-600 font-medium"
              >
                Property Name
              </label>
              <input
                required
                id="title"
                name="title"
                type="text"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*Type */}
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-gray-600 font-medium"
              >
                Price per Token
              </label>
              <input
                id="price"
                name="price"
                type="number"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Tokens Available */}
            <div>
              <label
                htmlFor="price"
                className="block text-gray-600 font-medium"
              >
                Tokens Available
              </label>
              <input
                min={1}
                id="tknrem"
                name="tknrem"
                type="number"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Delisting Period */}
            <div>
              <label
                htmlFor="delistingPeriod"
                className="block text-gray-600 font-medium"
              >
                Delisting Period (in hours)
              </label>
              <input
                min={1}
                id="delistingPeriod"
                required
                name="delistingPeriod"
                type="number"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Property Type */}
            <div className="item">
              <label htmlFor="type">Property Type</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-gray-600 font-medium"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Size */}
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" required />
            </div>
            {/* Bedrooms */}
            <div>
              <label
                htmlFor="bedroom"
                className="block text-gray-600 font-medium"
              >
                Bedrooms
              </label>
              <input
                id="bedroom"
                name="bedroom"
                type="number"
                min={1}
                required
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Bathrooms */}
            <div>
              <label
                htmlFor="bathroom"
                className="block text-gray-600 font-medium"
              >
                Bathrooms
              </label>
              <input
                id="bathroom"
                name="bathroom"
                required
                type="number"
                min={1}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="desc" className="block text-gray-600 font-medium">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="mt-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Post
          </button>
          {error && (
            <p className="text-red-500 mt-4 text-sm">An error occurred</p>
          )}
        </form>
      </div>

      {/* Side Section */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Images</h2>
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              alt="Uploaded"
              className="w-32 h-32 rounded-md object-cover"
            />
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dpwr2insh",
            uploadPreset: "estate",
            folder: "posts",
            required: true,
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
