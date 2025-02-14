import React from 'react';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import Contact from '../components/Contact'; // Importing the Contact component here
import Footer from '../components/Footer'

function Contacts() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Contact />
      </div>
      <Footer/>
    </div>
  );
}

export default Contacts;
