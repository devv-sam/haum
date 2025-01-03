import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import {
  MapPin,
  Bookmark,
  BookmarkCheck,
  SquareStack,
  Bed,
  Bath,
} from "lucide-react";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(post.price);
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };

  const Feature = ({ icon: Icon, title, description }) => (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon size={24} className="text-blue-600" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm font-light text-gray-600">{description}</p>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Slider */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <Slider images={post.images} />
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={20} className="mr-2" />
                  <span className="font-light">{post.address}</span>
                </div>
                <div className="text-2xl font-semibold text-blue-600">
                  {post.price.toFixed(2)} ETH
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.username}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-gray-700">
                  {post.user.username}
                </span>
              </div>
            </div>

            <div
              className="prose max-w-none font-light"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            />
          </div>

          {/* Property Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              General Information
            </h2>
          </div>

          {/* Property Sizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3">
              <SquareStack size={24} className="text-blue-600" />
              <div>
                <p className="text-sm font-light text-gray-600">Size</p>
                <p className="font-semibold">{post.postDetail.size} sqft</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3">
              <Bed size={24} className="text-blue-600" />
              <div>
                <p className="text-sm font-light text-gray-600">Bedrooms</p>
                <p className="font-semibold">{post.bedroom}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3">
              <Bath size={24} className="text-blue-600" />
              <div>
                <p className="text-sm font-light text-gray-600">Bathrooms</p>
                <p className="font-semibold">{post.bathroom}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nearby Places */}

          {/* Map */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <Map items={[post]} />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 ${
              saved
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            {saved ? (
              <BookmarkCheck size={20} className="mr-2" />
            ) : (
              <Bookmark size={20} className="mr-2" />
            )}
            {saved ? "Saved" : "Save Property"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
