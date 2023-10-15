const useParseAddress = async (geolocation) => {
  const apiKey = process.env.VUE_APP_GOOGLE_API_KEY;


  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geolocation.latitude},${geolocation.longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const address = data.results[0].formatted_address;
      console.log(JSON.stringify(data.results[0].formatted_address));
      return address;
    } else {
      console.error("Error fetching address:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default useParseAddress;
