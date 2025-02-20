import React from 'react';
import Home from './home/home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Courses from './Courses/Courses';
import Signup from './components/Signup';
import Contacts from './contacts/Contacts';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import ProtectedRoute from './protectedRoute/ProtectedRoute';

const App = () => {
  const [authUser] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Course"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Contact" element={<Contacts />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
