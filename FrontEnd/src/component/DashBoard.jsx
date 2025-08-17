import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { fetchCandidates } from '../utils/candidateapi';
import { useNavigate,Link} from 'react-router-dom';
export default function DashBoard() {
  const { user, refreshProfile, loading: authLoading } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [voteInfo, setVoteInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCandidates = async () => {
    try {
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (e) {
      console.error('Error loading candidates', e);
    }
  };

  const checkVote = async () => {
    if (!user) return;
    try {
      // Assuming your backend exposes something like /voting/profile or returns vote status in profile
      const res = await fetch(`/vote`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      if (res.ok) {
        const d = await res.json();
        if (d.voted) {
          setHasVoted(true);
          setVoteInfo(d); // e.g., { candidateId: ..., timestamp: ... }
        }
      }
    } catch {}
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await refreshProfile(); // ensure user is loaded
      await loadCandidates();
      await checkVote();
      setLoading(false);
    };
    init();
  }, []);

  const navigate = useNavigate();

const handleVote = () => {
  if (!user) {
    setStatus('Login required to vote.');
    return;
  }
  if (hasVoted) {
    setStatus('You already voted.');
    return;
  }
  if (!selected) {
    setStatus('Select a candidate.');
    return;
  }
  // navigate to dedicated vote page
  navigate(`/vote/${selected}`);
};

  if (authLoading || loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Voting Dashboard</h1>
          {user && (
            <p className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{user.name || user.email}</span> (
              {user.role})
            </p>
          )}
        </div>
        <div>
          {hasVoted ? (
            <div className="text-green-700 bg-green-100 px-3 py-1 rounded">
              You voted for:{' '}
              {
                candidates.find((c) => c._id === voteInfo?.candidateId)?.name ||
                voteInfo?.candidateId
              }
            </div>
          ) : (
            <div className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded">
              You haven't voted yet.
            </div>
          )}
        </div>
      </header>

      
    </div>
      
  );
}
