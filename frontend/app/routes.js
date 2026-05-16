import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("itinerary/:id", "routes/itinerary.detail.jsx"),
    route("create", "routes/create.jsx"),
    route("explore", "routes/explore.jsx"),
    // Admin Routes
    route("admin", "components/auth/ProtectedRoute.jsx", [
        index("routes/admin.dashboard.jsx"),
        route("countries", "routes/admin.countries.jsx"),
        route("provinces", "routes/admin.provinces.jsx"),
        route("cities", "routes/admin.cities.jsx"),
        route("categories", "routes/admin.categories.jsx"),
        route("tags", "routes/admin.tags.jsx"),
        route("places", "routes/admin.places.jsx"),
        route("itineraries", "routes/admin.itineraries.jsx"),
    ]),

    // Auth Routes
    route("login", "routes/login.jsx"),
    route("register", "routes/register.jsx"),
];
