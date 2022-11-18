let BASE_URL = "https://swift-pay.herokuapp.com";

if (window.location.origin?.includes("localhost")) {
  BASE_URL = "http://localhost:5000";
}

export { BASE_URL };
