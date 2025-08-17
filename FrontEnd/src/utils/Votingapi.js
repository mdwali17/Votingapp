const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// cast vote for candidateId via /vote/:candidateId
export const castVote = async (candidateId) => {
  const res = await fetch(`/voting/vote/${candidateId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Vote failed');
  }
  return res.json();
};

// get vote counts
export const fetchVoteCounts = async () => {
  const res = await fetch('/voting/vote/count', {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to load vote counts');
  }
  return res.json(); // array of { party, count }
};
