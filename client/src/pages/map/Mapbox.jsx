import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useEffect } from "react";
import css from "./Mapbox.module.css";
import userService from "../../services/user.service";
import { GeocodingService } from "@mapbox/mapbox-sdk/services/geocoding";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const Mapbox = () => {
  const [lng, setLng] = useState(54.37585762735543);
  const [lat, setLat] = useState(24.45677614934833);
  const [shopLocations, setShopLocations] = useState([]);

  // Replace YOUR_MAPBOX_ACCESS_TOKEN with your actual Mapbox access token
  const mapboxClient = mbxGeocoding({
    accessToken: process.env.REACT_APP_MAP_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });

    fetchShopLocations();
  }, []);

  const fetchShopLocations = () => {
    userService
      .getAllShopOwners()
      .then((response) => {
        console.log(response.data[0].shopLocation);
        const promises = response.data.map((shopOwner) => {
          return mapboxClient
            .forwardGeocode({
              query: shopOwner.shopLocation,
              limit: 1,
            })
            .send()
            .then((response) => {
              const feature = response.body.features[0];
              if (feature) {
                return {
                  longitude: feature.center[0],
                  latitude: feature.center[1],
                };
              } else {
                throw new Error(
                  "Geocoding failed for shop owner: " + shopOwner.shopLocation
                );
              }
            });
        });

        Promise.all(promises)
          .then((locations) => {
            setShopLocations(locations);
          })
          .catch((error) => {
            console.error("Failed to geocode shop locations:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to fetch shop locations:", error);
      });
  };

  return (
    <div className={css.container}>
      {/* Left Side */}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAP_KEY}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "15px",
                border: "2px solid red",
                // position: "absolute",
                // top: "57%",
                // left: "50%",
                width: "80vw",
                height: "80vh",
                // transform: "translate(-50%, -50%)",
              }}
              initialViewState={{
                longitude: lng,
                latitude: lat,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker longitude={lng} latitude={lat} />

              {shopLocations.map((location, index) => (
                <Marker
                  key={index}
                  longitude={location.longitude}
                  latitude={location.latitude}
                >
                  <div className={css.pin}></div>
                  <div className={css.pulse}></div>
                </Marker>
              ))}

              <NavigationControl position="bottom-right" />
              <FullscreenControl />
              <GeolocateControl />
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapbox;
