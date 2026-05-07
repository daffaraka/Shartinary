import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("itinerary/:id", "routes/itinerary.detail.jsx"),
    route("create", "routes/create.jsx"),
    route("explore", "routes/explore.jsx"),
    route("admin", "routes/admin.dashboard.jsx")
];
