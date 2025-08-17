import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div className="text-red-600">Not logged in</div>;
  

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-300 to-gray-400 p-6'>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl space-y-4 relative">
      <h2 className="text-xl font-bold">Profile</h2>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Adhar:</strong> {user.adharCardNumber}</p>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <button onClick={logout} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
        Logout
        </button>
        <Link to='/change-password' className="mt-2 bg-green-800 text-white px-3 py-1 rounded">
        Change Password
        </Link>
      </div>
    </div>  
    </div>
  );
}
