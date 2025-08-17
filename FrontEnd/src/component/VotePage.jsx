
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCandidate } from '../utils/candidateapi';
import { castVote } from '../utils/Votingapi';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function VotePage() {
  const { candidateId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);

  useEffect(() => {
    fetchCandidate(candidateId)
      .then(setCandidate)
      .catch((e) => setStatus('Load failed: ' + e.message));
  }, [candidateId]);

  const handleVote = async () => {
    if (!user) {
      setStatus('Login required.');
      return;
    }
    setSubmitting(true);
    setStatus('');
    try {
      await castVote(candidateId);
      setVoteSuccess(true);
      setStatus('Vote recorded successfully.');
      setTimeout(() => navigate('/'), 1500);
    } catch (e) {
      setStatus('Error: ' + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!candidate) {
    return (
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading candidate...
      </motion.div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-300 to-gray-400 p-6'>
    <motion.div
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        Vote for {candidate.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {candidate.party || 'No description available.'}
      </motion.p>

      <AnimatePresence>
        {!voteSuccess ? (
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={handleVote}
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.05 }}
              whileTap={{ scale: submitting ? 1 : 0.95 }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Cast Vote'}
            </motion.button>

            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="text-center text-green-600"
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-3xl text-white">✔</span>
            </div>
            <p className="font-semibold">Vote recorded successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {status && (
        <motion.div
          className="mt-2 text-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {status}
        </motion.div>
      )}
    </motion.div>
    </div>
  );
}

