import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {get} from 'axios'
import { useTranslation } from 'react-i18next';
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Maps = ({onClick}) => {
  const {t, i18n} = useTranslation()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })
  const [coords, setCoords] = useState({});
  const [map, setMap] = React.useState(null)
  const [markerPosition, setMarkerPosition] = useState({});
  useEffect(() => {
    const success = e => {
      setCoords({ lat: parseFloat(e.coords.latitude), lng: parseFloat(e.coords.longitude) })
    }
    navigator.geolocation.getCurrentPosition(success)
    
  }, [])
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coords);
    map.fitBounds(bounds);
    setMap(map)
  }, [coords])
  useEffect(() => {
    console.log("🚀 ~ file: Map.jsx ~ line 36 ~ Maps ~ coords", coords)

  },[coords])
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const changeMarketPosition = r=>{
    setMarkerPosition({ lat: parseFloat(r.latLng.lat()), lng: parseFloat(r.latLng.lng()) })
  }

  useEffect(() => {
    markerPosition.lat&& get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${markerPosition.lat},${markerPosition.lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`, {headers: {'Accept-Language': i18n.language}})
    .then(({data})=> {onClick(data.results[0]); console.log(data.results[0])})
  },[markerPosition.lat])
  return isLoaded && coords.lat ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coords}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={changeMarketPosition}
    >
      {markerPosition.lat &&<Marker position={markerPosition} onClick={e=> console.log(e  )}/>}
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(Maps)