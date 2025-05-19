import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  onClose: () => void;
}

const AjouterVehiculeModal: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState({
    marque: '',
    modele: '',
    carburant: '',
    kilometrage: '',
    prix_jour: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!image) return alert('Image requise');

    const token = localStorage.getItem('token');
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    data.append('image', image);

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/vehicules/', data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      onClose();
    } catch (err) {
      alert('Erreur lors de l’ajout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ajouter un véhicule</h2>
        <div className="space-y-3">
          <input type="text" name="marque" placeholder="Marque" className="input" onChange={handleChange} />
          <input type="text" name="modele" placeholder="Modèle" className="input" onChange={handleChange} />
          <select name="carburant" className="input" onChange={handleChange}>
            <option value="">Carburant</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybride">Hybride</option>
          </select>
          <input type="number" name="kilometrage" placeholder="Kilométrage" className="input" onChange={handleChange} />
          <input type="number" name="prix_jour" placeholder="Prix par jour" className="input" onChange={handleChange} />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:underline">Annuler</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AjouterVehiculeModal;
