import { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";

export function meta() {
  return [
    { title: "Manajemen Provinsi - Shartinary Admin" },
    { name: "description", content: "Kelola daftar provinsi berdasarkan negara." },
  ];
}

import ProvinceList from "../components/admin/province/ProvinceList";
import ProvinceForm from "../components/admin/province/ProvinceForm";
import CountryModal from "../components/admin/country/CountryModal"; // Reusable modal
import { useCountry } from "../contexts/CountryContext";

export default function AdminProvinces() {
  const { 
    countries, provinces, loadingProvinces, 
    fetchProvinces, addProvince, editProvince, removeProvince 
  } = useCountry();
  
  const [selectedCountry, setSelectedCountry] = useState("1"); // Default Indonesia
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProvince, setSelectedProvince] = useState(null);

  // Fetch provinces when selected country changes
  useEffect(() => {
    fetchProvinces(selectedCountry);
  }, [selectedCountry]);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedProvince(null);
    setIsModalOpen(true);
  };

  const handleEdit = (province) => {
    setModalMode("edit");
    setSelectedProvince(province);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    if (modalMode === "add") {
      result = await addProvince(formData);
    } else {
      result = await editProvince(selectedProvince.id, formData);
    }

    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <AdminLayout>
      <ProvinceList 
        data={provinces} 
        isLoading={loadingProvinces} 
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={(id) => removeProvince(id, selectedCountry)}
      />

      <CountryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah Provinsi Baru" : "Edit Data Provinsi"}
      >
        <ProvinceForm 
          initialData={selectedProvince}
          countries={countries}
          defaultCountryId={selectedCountry}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loadingProvinces}
        />
      </CountryModal>
    </AdminLayout>
  );
}
