import { useEffect, useState } from "react";
import axios from "axios";

const API =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function CountryCard() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            fontSize: "16px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredCountries.map((country) => (
          <div
            className="countryCard"
            key={country.common}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "150px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease",
            }}
          >
            <img
              src={country.png}
              alt={country.common}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {country.common}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryCard;