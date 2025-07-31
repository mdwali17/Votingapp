import { useAuth } from '../AuthContext';

export default function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div className="text-red-600">Not logged in</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Adhar:</strong> {user.adharCardNumber}</p>
      </div>
      <button onClick={logout} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}
