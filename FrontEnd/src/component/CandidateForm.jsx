import { useState, useEffect } from 'react';
import {
  addCandidate,
  fetchCandidate,
  updateCandidate,
} from '../utils/candidateapi';
import { useParams, useNavigate } from 'react-router-dom';

export default function CandidateForm() {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', party: '',age:'' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (id) {
      fetchCandidate(id)
        .then(c => setForm({ name: c.name || '', party: c.party || '',age: c.age || '' }))
        .catch(e => setMsg(e.message));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCandidate(id, form);
      } else {
        await addCandidate(form);
      }
      navigate('/candidates');
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">{id ? 'Edit Candidate' : 'New Candidate'}</h2>
      {msg && <div className="text-sm text-red-600">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full border rounded px-3 py-2"
            placeholder="Candidate name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Party</label>
          <input
            required
            value={form.party}
            onChange={(e) => setForm(f => ({ ...f, party: e.target.value }))}
            className="w-full border rounded px-3 py-2"
            placeholder="Party"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Age</label>
          <textarea
            value={form.age}
            onChange={(e) => setForm(f => ({ ...f, age: e.target.value }))}
            className="w-full border rounded px-3 py-2"
            placeholder="Candidate Age"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
