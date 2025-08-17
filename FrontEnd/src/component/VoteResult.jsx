// 

import { useEffect, useState } from 'react';
import { fetchVoteCounts } from '../utils/Votingapi';
import { motion } from 'framer-motion';

export default function VoteResults() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const data = await fetchVoteCounts();
      setResults(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Calculate total votes for percentage bars
  const totalVotes = results.reduce((sum, r) => sum + r.count, 0);
  const leader = results.length
    ? results.reduce((a, b) => (a.count > b.count ? a : b))
    : null;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-300 to-gray-400 p-6'>
    <motion.div
      className="max-w-md w-full mx-auto p-6 space-y-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Voting Results
      </h2>

      {error && <div className="text-red-600 text-center">{error}</div>}

      {results.length === 0 ? (
        <motion.div
          className="text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No voting data yet.
        </motion.div>
      ) : (
        <div className="space-y-4">
          {results.map((r, idx) => {
            const percentage = ((r.count / totalVotes) * 100).toFixed(1);
            const isLeader = leader && leader.party === r.party;
            return (
              <motion.div
                key={r.party}
                className={`p-4 rounded-xl shadow-md border ${
                  isLeader
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">{r.party}</span>
                  <span className="font-medium">
                    {r.count} votes ({percentage}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-3 rounded-full ${
                      isLeader
                        ? 'bg-white'
                        : 'bg-indigo-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
    /</div>
  );
}
