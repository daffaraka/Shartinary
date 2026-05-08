import React, { useEffect } from "react";
import { getCountries } from "../api/country.api";


const CountryContext = React.createContext();


export default function CountryProvider({ children }) {
    const [countries, setCountries] = React.useState([]);
    const [provinces, setProvinces] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setLoading(true)
                const res = await getCountries();
                setCountries(res.data.data)
            } catch (err) {
                console.log(err.response.data.message);
            } finally {
                setLoading(false)
            }
        }
        fetchCountry();
    }, []);

    return (
        <CountryContext.Provider value={{ countries, provinces, cities }}>
            {children}
        </CountryContext.Provider>
    );
}