import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";
import convertToBase64 from "../components/convert";
import { GpsFixed } from "@material-ui/icons";
import { Navbar } from "./Home/index";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

// load google map api js
function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [file, setFile] = useState("");
  const [address, setAddress] = useState({});

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const apiKey = process.env.REACT_APP_GMAP_API_KEY;
  const mapApiJs = "https://maps.googleapis.com/maps/api/js";
  const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

  const onChangeUserid = (e) => {
    const userid = e.target.value;
    setUserId(userid);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };


  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  // do something on address change
  const onAddressChange = (e) => {
    // console.log(typeof autocomplete);
    // const place = autocomplete.getPlace();
    // setAddress(extractAddress(place));

    const place = e.target.value;
    setAddress(place);
  };

  const onUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setFile(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    const profile = file || '';

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(userid,username, email, password, address, profile))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  const searchInput = useRef(null);

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }

    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onAddressChange(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        searchInput.current.value = _address.plain();
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // Load maр script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  return (
    <section className="gradient-bg-services col-md-12" id="home">
      {currentUser ? null : <Navbar />}
      <div className="card card-container shadow-[0_0.5rem_1rem_rgba(0,0,0,0.5)] rounded-[2rem] bg-[rgba(39,51,89,0.4)]">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="profile">
                  <img
                    src={file || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                    alt="profile-img"
                    className="profile-img-card"
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                  className="hidden"
                />
              </div>

              <div className="form-group">
                <label htmlFor="userid">Userid</label>
                <Input
                  type="text"
                  className="form-control text-black"
                  name="userid"
                  value={userid}
                  onChange={onChangeUserid}
                  validations={[required, vusername]}
                  style={{ textTransform: "none" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control text-black"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                  style={{ textTransform: "none" }}
                />
              </div>

              <div className="form-group ">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control text-black"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                  style={{ textTransform: "none" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control text-black"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                  style={{ textTransform: "none" }}
                />
              </div>

              <div className="form-group relative">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  // ref={searchInput}
                  className="form-control text-black"
                  style={{ borderBottom: "none", textTransform: "none" }}
                  name="address"
                  onChange={onAddressChange}
                />
                {/* <button onClick={findMyLocation}>
                  <GpsFixed className="absolute top-[58%] right-6 text-black" />
                </button> */}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert-success" : "alert alert-danger"}
                role="alert"
              >
                {typeof message === "object" ? message._message : message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </section>
  );
};

export default Register;

// AIzaSyAqTThxs00RgLhUpRGN6BbpDorPzwNwEOE
