import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

const UserLocation = ({ onMarkerClick, currentLocation }) => {
  const map = useMapEvents({
    click(e) {
      if (onMarkerClick) {
        onMarkerClick(e.latlng);
      }
      map.flyTo(e.latlng, 15);
    },
    locationfound(e) {
      map.flyTo(e.latlng, 15);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      map.flyTo([latitude, longitude], 15);
    }
  }, [currentLocation, map]);

  return null;
};

const TakeLocation = ({ onMapDataChange }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [markerPosition, setMarkerPosition] = useState({
    lat: 35.6895,
    lng: 51.389,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasUserClicked, setHasUserClicked] = useState(false);
  const [loading, setLoading] = useState(true); // NEW

  const handleMarkerClick = (latlng) => {
    setMarkerPosition(latlng);
    setHasUserClicked(true);
    onMapDataChange(latlng);
  };

  const customMarkerIcon = new L.Icon({
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGUlEQVR4nO2aS0hVURSG/8pepDWM7AFFBZk1CdTuXeucHko2qAbRpGkkiaLUJCcNgmjeoIggEGleNGkShRSRSJNUGkVBZVH0VkrF/tjn3m5iaXuf1z1CCxZcLpd//9866yz22ecC/6MQVKyloIWKHgoeUfCOggkqxql4S0U/Bd1UHGMO1chKUNBMxV0qJqmgZZrf3qagsbzGBX0Opv+eggepgrARKyi4Ftn4nyDdzKEqWfMeNlHwJHbzWsoh+tiYlPltFLxJ0DyLV2KYHrbEaz6HagpeJG5eS/mKPtbEY34HFgYjMD3zLOZD+qiIDqA4WwbzLOaZaObzWEfBN8cefkwPncxjK5uwLEjz2XwnGHAEGGUDVkep/kUH498paCUwf0a9I1hARRsVYw4QF8KZz6GKii/W5j3sdijMHmsIwSdzFd0BFIcdqnQihH67g/4hdwDBZeuen6Vt/tFOg5YAl8IA2O1zBB3O4r/XOGkJcN9dvLAFtgGoCQ3go9Zyjdfu4ubGtBH3URkaIBcMCqsh4S5uZrCNeIQdJOuw3BLgq7u44FlmWkjxNAxAr5W4h87Eb2LBnTDi5y3FB8xIDDlGhyyvwDl3gDz2W4qbbHPWF3Q46O9zB2jGYio+WC4wRsFeB/ONxdMKWuR71mCRM0CwkOKKQ5XM3qZ9tnYK2qZQeVvzNDuCUOaLlap3APiVg8HNaSaMj8pi1lJwyqHnOSXrQgMEEIp7IRaNJwW9kcwHAB4Olg0gjwORAQIIc/iUfvX7CMyLB0DhpQ7g2T8g2UEIbqQIcD1W81Me8EdSMD9KxfrYAQIIRVcKvX86EfMBgI+KhG/ofnOQlhhAACHYYH1a4Vb5EQo2J2p+CkRLAgDHUzFfglDcjBHgVmwz3xqgHiuDo/DolR82WqmaL0F42Ol4TDg9x+lBy2K+BFE46wxb/VZkIai4GgKgB1kJNmCp40uQfvpYgiwFFauoeG5h/mVsr4/iDnNGRMHHWcx/pmA7shzMY9cMk8lMnCbMhaCHo9P+ejBpvsNcCprXTQXzP8K8AEEWorj97kpykZ+xubp/rAMA/QAAAABJRU5ErkJggg==",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const handleCurrentLocationClick = () => {
    setLoading(true); // show loading while fetching
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLocation(coords);
          setMarkerPosition({ lat: coords.latitude, lng: coords.longitude });

          if (!hasUserClicked) {
            onMapDataChange({ lat: coords.latitude, lng: coords.longitude });
          }
          setLoading(false);
        },
        (error) => {
          setErrorMsg(
            "برای اینکه موقعیت دقیقتان را روی نقشه ببینیم، لازم است دسترسی به موقعیت مکانی (دسترسی مرورگر به موقعیت مکانی) را در دستگاه‌تان فعال کنید"
          );
          setLoading(false);
          console.error(error);
        }
      );
    } else {
      setErrorMsg("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentLocationClick();
  }, []);

  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     alert("Location access is ON");
  //     console.log("Latitude:", position.coords.latitude);
  //     console.log("Longitude:", position.coords.longitude);
  //   },
  //   (error) => {
  //     if (error.code === error.PERMISSION_DENIED) {
  //       alert("Location access is OFF (Permission Denied)");
  //     } else if (error.code === error.POSITION_UNAVAILABLE) {
  //       alert("Location unavailable (possibly GPS off)");
  //     } else if (error.code === error.TIMEOUT) {
  //       alert("Location request timed out");
  //     } else {
  //       alert("Unknown error: " + error.message);
  //     }
  //   }
  // );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        // alert("📍 Location is ON");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          // alert("❌ Location permission denied");
        } else {
          // alert("⚠️ Location not available: " + err.message);
        }
      }
    );
  }, []);

  return (
    <div className="relative">
      <div className="mx-auto">
        <MapContainer
          center={markerPosition}
          zoom={14}
          scrollWheelZoom={false}
          minZoom={3}
          className="h-[300px]"
          zoomControl={true}
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <UserLocation
            onMarkerClick={handleMarkerClick}
            currentLocation={currentLocation}
          />
          {markerPosition && (
            <Marker position={markerPosition} icon={customMarkerIcon}>
              <Popup>
                Latitude: {markerPosition.lat.toFixed(6)}, Longitude:{" "}
                {markerPosition.lng.toFixed(6)}
              </Popup>
            </Marker>
          )}
        </MapContainer>

        <button
          onClick={handleCurrentLocationClick}
          className="bg-white p-1 rounded border-0 absolute map-current-location"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABbklEQVR4nOWUu06CQRCFP3wAL5VQG4Kd0hpMBB7L25OolAJqowJGhSCF8QXwDRSNWCjUmDVnkw35L/ujlZ5kks1h5sz8cwH+Gx6A+98UTAFloAI8AhOZeR8BpZ+I54CuIxpmHSCbVHwTeJfAM7ADrANNoKH3rn4zPkOgkKRyK34MzEf4LgA1J0nWp+ddRzzlUZDxqSumHedcluPTVOV5teYT+AAu1SaLRWCg2GJUgoqcth1uFRgHDHesdlrsiT+ISmBX0a3uTFwVWJZVxZ1OfaXh+mHiPae6lsO/iks7XEbci8O1nPheXIJGQIJMTIKmE38X16J8SIvSsplahM5/oiOyyAGjgCGPZhlySU4DHZGFGfqFVtTYObAWsqZbxBxNR441z0ObA04Uc+Ph/33uQwXUVV0YljQH4/sGrOCJgpNkoP6aIV4DV3rva4us+IavuPslbY+/69sklQehCBxq/axoX9sSOdBZ0Is6or+JLzbqlM9D6CjmAAAAAElFTkSuQmCC"
            className="current-location-icon"
            width="22"
            height="22"
          />
        </button>

        <div
          className={`${
            !errorMsg ? "opacity-0" : ""
          } text-red-500 mt-2 text-center`}
        >
          {errorMsg}
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute z-[9999999] inset-0 bg-white bg-opacity-[0.8] flex items-center justify-center">
          <div className="text-center p-4 text-sm text-gray-600">
            در حال دریافت موقعیت مکانی...
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeLocation;