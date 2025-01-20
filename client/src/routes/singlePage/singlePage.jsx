import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { MapPin } from "lucide-react";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const previousState = saved;
    setSaved(!previousState);

    try {
      const endpoint = previousState ? "/users/unsave" : "/users/save";
      await apiRequest.post(endpoint, { postId: post.id });
    } catch (error) {
      console.log(error);
      setSaved(previousState);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 md:px-8 mx-auto py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Column */}
          <div className="lg:w-[45%]">
            <div>
              {/* Header Section */}
              <div className="mb-6 ">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 ">
                  {post.title}
                </h1>
                <div className="flex items-center pb-6">
                  <MapPin size={20} color="gray" />
                  <p className="text-gray-600 ">{post.address}</p>
                </div>
                {/* Key Stats */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Price per token</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">
                        {post.price.toFixed(2)} ETH
                      </p>
                    </div>

                    <div className="md:border-l border-gray-200 md:pl-4">
                      <p className="text-gray-500 text-sm">Size</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">
                        {post.postDetail.size} m²
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Info and Bid Button */}
            <div className="mb-8">
              <div className="flex lg:items-center flex-col md:flex-row justify-between mb-6 gap-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={post.user.avatar}
                    alt={post.user.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Listed by</p>
                    <p className="font-medium">{post.user.username}</p>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className={`px-8 py-4 rounded-full font-medium transition-colors duration-200 ${
                    saved
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {saved ? "Remove Bid" : "Place a Bid"}
                </button>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4">
                <p className="text-gray-500 text-sm">Bedrooms</p>
                <p className="font-medium">{post.bedroom}</p>
              </div>
              <div className="text-center p-4">
                <p className="text-gray-500 text-sm">Bathrooms</p>
                <p className="font-medium">{post.bathroom}</p>
              </div>
              <div className="text-center p-4">
                <p className="text-gray-500 text-sm">Property Type</p>
                <p className="font-medium capitalize">{post.property}</p>
              </div>
              <div className="text-center p-4">
                <p className="text-gray-500 text-sm">Listed Date</p>
                <p className="font-medium">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <div
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.postDetail.desc),
                }}
              />
            </div>

            {/* Map */}
            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-900">Location</h2>
              </div>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <Map items={[post]} />
              </div>
            </div>
          </div>

          {/* Right Column - Slider */}
          <div className="lg:w-[50%] flex flex-col gap-4">
            <Slider images={post.images} />
            {/* <div className="flex gap-4 ">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  className="w-1/3 h-48 object-cover rounded-lg"
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
