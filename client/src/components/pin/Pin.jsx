import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex gap-5">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-16 h-12 object-cover rounded-md"
          />
          <div className="flex flex-col justify-between">
            <Link to={`/${item.id}`} className="text-blue-500 font-semibold">
              {item.title}
            </Link>
            <span className="text-sm text-gray-600">
              {item.bedroom} bedroom
            </span>
            <b className="text-lg text-gray-800">$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
