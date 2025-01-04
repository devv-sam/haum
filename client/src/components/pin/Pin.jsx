import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div>
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
              {item.bedroom}bd | {item.bathroom}ba
            </span>
            <b className="text-md text-gray-800">{item.price.toFixed(2)} ETH</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
