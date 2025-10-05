require('dotenv').config();
const { Router: RegisterRouter } = require("express");
const searchPlaceRouter = RegisterRouter();
const redisClient = require("./redisClient");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

searchPlaceRouter.post("/place", async (req: any, res: any) => {
    async function getCoordinates(city: string): Promise<string> {
        try {
            const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_API_KEY}`;
            const response = await fetch(geoUrl);
            const data = await response.json();
            // console.log(data);

            if (data.status === "OK") {
                const location = data.results[0].geometry.location;
                return `${location.lat},${location.lng}`;
            } else {
                throw new Error("Location not found");
            }
        } catch (error) {
            console.error("Geocoding Error:", error);
            throw error;
        }
    }

    try {
        const { place } = req.body; // Ensure correct structure
        const radius = 20000; // 20km radius
        const redisKey = `place:${place.toLowerCase().trim()}`;
        const cachedResult = await redisClient.get(redisKey);

        if (cachedResult) {
            return res.json({ redis: JSON.parse(cachedResult) });
        }

        // Convert city name to lat/lng
        const location = await getCoordinates(place);

        // Search for famous places
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=tourist_attraction&key=${GOOGLE_API_KEY}`;
        const response = await fetch(placesUrl);
        const data = await response.json();

        const places = data.results;

        if (!places || places.length === 0) {
            return res.json({ message: "No famous places found." });
        }

        // Format response
        const formattedPlaces = places.map((place: any) => ({
            name: place.name,
            user_ratings_total: place.user_ratings_total,
            address: place.vicinity || "No address available",
            rating: place.rating || "No rating",
            type: place.types ? place.types.join(", ") : "Unknown type",
            photos: place.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                : "No image available",
            vicinity: place.vicinity,
            geometry: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
            }
        }));

        await redisClient.set(redisKey, JSON.stringify(formattedPlaces), {
            EX: 3600,
        });


        res.json(formattedPlaces);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ error: "Error fetching famous places." });
    }
});


searchPlaceRouter.post("/place/details", async (req: any, res: any) => {
    const { place } = req.body;

    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(place)}&key=${process.env.GOOGLE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        // console.log("Text Search API Response:", data);

        if (data.status === "OK" && data.results.length > 0) {
            const placeData = data.results[0]; // Take the first match

            const placeDetails = {
                name: placeData.name || "No name available",
                address: placeData.formatted_address || "No address available",
                rating: placeData.rating || "No rating",
                user_ratings_total: placeData.user_ratings_total || 0,
                photos: placeData.photos && placeData.photos.length > 0
                    ? placeData.photos.map((photo: any) =>
                        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_API_KEY}`
                    )
                    : [
                        "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
                    ],
                geometry: {
                    lat: placeData.geometry?.location?.lat || 0,
                    lng: placeData.geometry?.location?.lng || 0
                }
            };

            res.json(placeDetails);
        } else {
            res.status(404).json({ message: "Place not found." });
        }
    } catch (error) {
        console.error("Error fetching place details:", error);
        res.status(500).json({ error: "Error fetching place details." });
    }
});

searchPlaceRouter.post("/place/near", async (req: any, res: any) => {
    const { lat, lng } = req.body;

    try {
        const radius = 20000; // 20km radius
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=tourist_attraction&key=${GOOGLE_API_KEY}`;
        const response = await fetch(placesUrl);
        const data = await response.json();

        const places = data.results;

        if (!places || places.length === 0) {
            return res.json({ message: "No famous places found." });
        }

        // Format response
        const formattedPlaces = places.map((place: any) => ({
            name: place.name,
            user_ratings_total: place.user_ratings_total,
            address: place.vicinity || "No address available",
            rating: place.rating || "No rating",
            type: place.types ? place.types.join(", ") : "Unknown type",
            photos: place.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                : "No image available",
            vicinity: place.vicinity,
            geometry: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
            }
        }));

        res.json(formattedPlaces);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ error: "Error fetching famous places." });
    }
});


module.exports = { searchPlaceRouter };
