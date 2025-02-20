import React from 'react';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear user state properly by setting it to null
      setAuthUser(null); 
      // Remove user data from localStorage
      localStorage.removeItem('Users');
      toast.success('Logout successfully');
      // Redirect to homepage after logout
      navigate('/');
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };
  
  

  return (
    <div>
      <button
        className="w-24 py-2 px-3 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
