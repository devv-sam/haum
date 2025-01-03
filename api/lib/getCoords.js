import fetch from "node-fetch";

const getCoords = async (address) => {
  const apiKey = process.env.OPENCAGE_API_KEY;

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(
        `OpenCage API error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    const result = data.results[0];

    if (!result) {
      throw new Error("No results found for the provided address.");
    }

    return {
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
    };
  } catch (error) {
    console.error("Error in getCoordinates:", error.message);
    throw error;
  }
};

export default getCoords;
