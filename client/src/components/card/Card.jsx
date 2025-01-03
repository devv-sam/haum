import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { Bookmark, BookmarkCheck } from "lucide-react";
import getRemainingTime from "../../lib/delisting";

const Card = ({ item }) => {
  const [saved, setSaved] = useState(item.isSaved);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSave = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setSaved((prev) => !prev);

    try {
      const endpoint = saved ? "/users/unsave" : "/users/save";
      const response = await apiRequest.post(endpoint, {
        postId: item.id,
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update save status"
        );
      }
    } catch (error) {
      console.error("Save/unsave error:", error);
      setSaved((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1 max-w-sm w-full">
      <Link to={`/${item.id}`} className="relative block">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            } ${saved ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          >
            {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
        <div className="aspect-square w-full">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {item.user ? (
              <>
                <img
                  src={item.user.avatar}
                  alt={`${item.user.username}'s avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-mona_sans font-medium text-gray-900">
                  {item.user.username}
                </span>
              </>
            ) : (
              <span className="text-gray-500">Anonymous</span>
            )}
          </div>
        </div>

        <h2 className="text-lg font-mona_sans font-semibold text-gray-900 mb-4">
          {item.title}
        </h2>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-500">Ending in</p>
            <p className="font-mona_sans font-medium">
              {getRemainingTime(item.delistingDate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Price per token</p>
            <p className="font-mona_sans font-medium">
              {item.price.toLocaleString()} ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
