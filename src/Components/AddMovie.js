import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "./firebase/firebase";
import swal from 'sweetalert'
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

// Component for adding a new movie to the database
const AddMovie = () => {
  // Access the global app state
  const useAppstate = useContext(Appstate)
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // State for the form data
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0
  });
  
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to add a new movie to the database
  const addMovie = async () => {
    setLoading(true);
    try {
      if(useAppstate.login) {
        // Add the movie to Firestore
        await addDoc(moviesRef, form);
        // Show success message
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        // Reset the form
        setForm({
          title: "",
          year: "",
          description: "",
          image: ""
        })
      } else {
        // Redirect to login if user is not authenticated
        navigate('/login')
      }
    } catch(err) {
      // Show error message if adding fails
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          {/* Form title */}
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              {/* Title input */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              {/* Year input */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-300">
                    Year
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e) => setForm({...form, year: e.target.value})}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              {/* Image link input */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image}
                    onChange={(e) => setForm({...form, image: e.target.value})}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              {/* Description textarea */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              {/* Submit button */}
              <div className="p-2 w-full">
                <button onClick={addMovie} className="flex mx-auto text-white bg-purple-600 border-0 py-2 px-8 focus:outline-none hover:bg-purple-700 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white" /> : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
