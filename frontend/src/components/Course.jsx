import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";
import axios from "axios";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBook(res.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    getBook(); // Call the function when the component mounts
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <>
      <div className="py-1 max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="justify-center items-center text-center mt-28">
          <h1 className="text-1xl md:text-4xl font-semibold">
            Welcome! We're glad you're{" "}
            <span className="text-blue-500">here :)</span>
          </h1>
          <p className="m-10">
            Unlock your potential with our curated selection of courses,
            designed for all levels. Whether you're a beginner or an expert,
            you'll find something to enhance your skills. Dive into engaging
            content, taught by industry experts. Start learning at your own
            pace, from anywhere. Begin your journey today and transform your
            future.
          </p>
          <Link to="/">
            <button className="m-3 bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 duration-300 rounded-md">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
