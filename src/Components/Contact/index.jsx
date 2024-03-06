import { Input } from "../Forms/Input"
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './styles.css'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";


export const Contact = () => {
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const [location, setLocation] = useState({
        lat: 0,
        lng: 0,
      });

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAArItYyvL1J4Ggx0HjpGqOorWCgY07cRk', 
      });
    
      useEffect(() => {
        if (isLoaded) {
          setGoogleMapsLoaded(true);
          const geocoder = new window.google.maps.Geocoder();
          const address = "Av. São José (80050-350), 1084 - Cristo Rei, Curitiba - PR"
          geocoder.geocode({ address }, (results, status) => {
            if (status === "OK" && results.length > 0) {
              setLocation({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
              console.error('Erro ao geocodificar endereço:', status);
            }
          });
        }
      }, [isLoaded, googleMapsLoaded]); 

    return (
        <div>
            <div className="contact-container container">
                <div className="left-side__contact">
                    <div className="media-social__contact">
                        <h1>Mídia Social</h1>
                        <ul id="media">
                            <li><a href="https://www.facebook.com/lotimobiliaria"><span><FaFacebook /></span></a></li>
                            <li><a href=""><span><FaInstagram /></span></a></li>
                        </ul>
                    </div>

                    <div className="contact-container__contact">
                        <h1>Contato</h1>
                        <ul>
                            <li><span><FaMapMarkerAlt /></span><p>AV. SÃO JOSÉ, 1084 CRISTO REI – CURITIBA / PR</p></li>
                            <li><span><FaPhone /></span><p>(41) 3206-9139 | (41) 99514-3839</p></li>
                            <li><span><MdEmail /></span><p>contato@lotimobiliaria.com.br</p></li>
                        </ul>
                    </div>
                </div>

                <div className="right-side__map">
                <h1 id="map-endereco">Endereço</h1>
                <p id="map-desc">Av. São José, 1084 - Cristo Rei</p>
                { 
                  isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{width: '100%', height: '100%'}}
                      center={location}
                      zoom={15}
                    >
                      <Marker position={location}/>
                    </GoogleMap>
                  ) : <></>
                }
              </div>
            </div>
        </div>
    )
}