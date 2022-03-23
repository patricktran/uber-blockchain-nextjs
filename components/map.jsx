import { useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { UberContext } from "../context/uber-context";

const style = {
  wrapper: `flex-1 h-full w-full`,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const { pickupCoords, dropoffCoords } = useContext(UberContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.29011, 39.39172],
      zoom: 3,
    });

    const addTopMap = (map, coordinates) => {
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };

    // this works because there is no race condition between loading the map and user entering coords
    // but if pickupCoords and dropoffCoords had default values, then we may need to wrap this in a useEffect
    if (pickupCoords) {
      addTopMap(map, pickupCoords);
    }

    if (dropoffCoords) {
      addTopMap(map, dropoffCoords);
    }

    if (pickupCoords && dropoffCoords) {
      map.fitBounds([dropoffCoords, pickupCoords], {
        padding: 400,
      });
    }
  }, [dropoffCoords, pickupCoords]);

  return <div className={style.wrapper} id="map"></div>;
};

export default Map;
