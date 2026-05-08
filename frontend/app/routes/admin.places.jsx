import { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import PlaceList from "../components/admin/place/PlaceList";
import PlaceForm from "../components/admin/place/PlaceForm";
import AdminModal from "../components/admin/country/CountryModal"; // Reusing the modal
import { usePlace } from "../contexts/PlaceContext";
import { useCountry } from "../contexts/CountryContext";
import { useCategory } from "../contexts/CategoryContext";
import { useTag } from "../contexts/TagContext";

export function meta() {
  return [
    { title: "Manajemen Destinasi - Shartinary Admin" },
    { name: "description", content: "Kelola Point of Interest (POI) dan lokasi wisata." },
  ];
}

export default function AdminPlaces() {
  const { places, loading, addPlace, editPlace, removePlace } = usePlace();
  const { countries, provinces, cities, fetchProvinces, fetchCities } = useCountry();
  const { categories } = useCategory();
  const { tags } = useTag();
  
  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedPlace(null);
    setIsModalOpen(true);
  };

  const handleEdit = (place) => {
    setModalMode("edit");
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    if (modalMode === "add") {
      result = await addPlace(formData);
    } else {
      result = await editPlace(selectedPlace.id, formData);
    }

    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <AdminLayout>
      <PlaceList 
        data={places} 
        isLoading={loading} 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={removePlace}
      />

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah Destinasi Baru" : "Edit Data Destinasi"}
      >
        <PlaceForm 
          initialData={selectedPlace}
          countries={countries}
          provinces={provinces}
          cities={cities}
          categories={categories}
          tags={tags}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loading}
          onCountryChange={fetchProvinces}
          onProvinceChange={fetchCities}
        />
      </AdminModal>
    </AdminLayout>
  );
}
