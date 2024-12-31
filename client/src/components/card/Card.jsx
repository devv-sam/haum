import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { MapPin, Bed, Bath, Bookmark, BookmarkCheck } from "lucide-react";

function Card({ item }) {
  const [saved, setSaved] = useState(item.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: item.id });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <Link
        to={`/${item.id}`}
        className="block relative aspect-[4/3] overflow-hidden"
      >
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-[mona_sans] font-medium text-gray-900 mb-2">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h2>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{item.address}</span>
          </div>
          <p className="text-xl font-[mona_sans] font-semibold text-blue-600">
            ₿{item.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center text-gray-600">
              <Bed size={18} className="mr-1" />
              <span className="text-sm">{item.bedroom}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath size={18} className="mr-1" />
              <span className="text-sm">{item.bathroom}</span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition-colors duration-200 ${
              saved
                ? "text-blue-600 bg-blue-50"
                : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
