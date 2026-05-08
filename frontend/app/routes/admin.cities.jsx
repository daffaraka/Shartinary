import { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";

export function meta() {
  return [
    { title: "Manajemen Kota - Shartinary Admin" },
    { name: "description", content: "Kelola daftar kota di Shartinary." },
  ];
}

import CityList from "../components/admin/city/CityList";
import CityForm from "../components/admin/city/CityForm";
import CountryModal from "../components/admin/country/CountryModal"; 
import { useCountry } from "../contexts/CountryContext";

export default function AdminCities() {
  const { 
    countries, provinces, cities, loadingCities, 
    fetchProvinces, fetchCities, addCity, editCity, removeCity 
  } = useCountry();
  
  const [selectedCountry, setSelectedCountry] = useState("1"); // Default Indonesia
  const [selectedProvince, setSelectedProvince] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetch provinces and ALL cities in the country when country changes
  useEffect(() => {
    if (selectedCountry) {
        fetchProvinces(selectedCountry);
        fetchCities({ country_id: selectedCountry }); // Get all cities in the country
        setSelectedProvince(""); // Reset province selection
    }
  }, [selectedCountry]);

  // Fetch cities by specific province when a province is selected
  useEffect(() => {
    if (selectedProvince) {
        fetchCities({ province_id: selectedProvince });
    } else if (selectedCountry) {
        // Fallback to all cities in country if province is deselected
        fetchCities({ country_id: selectedCountry });
    }
  }, [selectedProvince]);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedCity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (city) => {
    setModalMode("edit");
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    if (modalMode === "add") {
      result = await addCity(formData);
    } else {
      result = await editCity(selectedCity.id, formData);
    }

    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <AdminLayout>
      <CityList 
        data={cities} 
        isLoading={loadingCities} 
        countries={countries}
        provinces={provinces}
        selectedCountry={selectedCountry}
        selectedProvince={selectedProvince}
        onCountryChange={setSelectedCountry}
        onProvinceChange={setSelectedProvince}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={(id) => removeCity(id, selectedProvince, selectedCountry)}
      />

      <CountryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah Kota Baru" : "Edit Data Kota"}
      >
        <CityForm 
          initialData={selectedCity}
          countries={countries}
          provinces={provinces}
          defaultCountryId={selectedCountry}
          defaultProvinceId={selectedProvince}
          onCountryChange={fetchProvinces}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loadingCities}
        />
      </CountryModal>
    </AdminLayout>
  );
}
