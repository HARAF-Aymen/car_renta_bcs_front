    import React, { useState } from 'react';
    import axios from 'axios';

    interface Props {
    vehicule: any;
    onClose: () => void;
    }

    const ModifierVehiculeModal: React.FC<Props> = ({ vehicule, onClose }) => {
    const [form, setForm] = useState({
        marque: vehicule.marque,
        modele: vehicule.modele,
        carburant: vehicule.carburant,
        kilometrage: vehicule.kilometrage,
        prix_jour: vehicule.prix_jour,
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const data = new FormData();
        Object.entries(form).forEach(([key, val]) => data.append(key, val.toString()));
        if (image) data.append('image', image);

        try {
        setLoading(true);
        await axios.put(`http://localhost:5000/api/vehicules/${vehicule.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        onClose();
        } catch (err) {
        alert("Erreur lors de la mise à jour");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modifier le véhicule</h2>
            <div className="space-y-3">
            <input type="text" name="marque" value={form.marque} className="input" onChange={handleChange} />
            <input type="text" name="modele" value={form.modele} className="input" onChange={handleChange} />
            <select name="carburant" value={form.carburant} className="input" onChange={handleChange}>
                <option value="Essence">Essence</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybride">Hybride</option>
            </select>
            <input type="number" name="kilometrage" value={form.kilometrage} className="input" onChange={handleChange} />
            <input type="number" name="prix_jour" value={form.prix_jour} className="input" onChange={handleChange} />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </div>

            <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="text-gray-600 hover:underline">Annuler</button>
            <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                {loading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default ModifierVehiculeModal;
