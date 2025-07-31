import { useEffect, useState } from 'react';
import {
  fetchCandidates,
  deleteCandidate,
} from '../utils/candidateapi';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this candidate?')) return;
    try {
      await deleteCandidate(id);
      setCandidates(c => c.filter(cand => cand._id !== id));
    } catch (e) {
      alert('Delete failed: ' + e.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Candidates</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/candidates/new')}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Candidate
          </button>
        )}
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid gap-4">
        {candidates.map(c => (
          <div
            key={c._id}
            className="border rounded p-4 flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold">{c.name || `Candidate ${c._id}`}</h2>
              <p>{c.description || 'No description'}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/candidates/${c._id}/edit`)}
                className="text-sm px-3 py-1 border rounded"
              >
                Edit
              </button>
              {user?.role === 'admin' && (
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {candidates.length === 0 && <div>No candidates found.</div>}
      </div>
    </div>
  );
}
