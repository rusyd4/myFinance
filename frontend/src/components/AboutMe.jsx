import React, { useState } from "react";
import { Link } from "react-router-dom";

const AboutMe = () => {
  const persons = [
    { name: "Naufal Rusyda Santosa", id: "2206813353" },
    { name: "Muhammad Nadhif Fasichul Ilmi", id: "2206813416" },
    { name: "Muhammad Fahish Haritsah Bimo", id: "2206059616" },
    { name: "Achmad Zaidan Lazuardy", id: "2206059793" }
  ];

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'dark' : ''}`}>
      <h2 className="text-3xl font-bold mb-6 text-white">About Us</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {persons.map((person, index) => (
          <PersonCard key={index} person={person} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

const PersonCard = ({ person, index }) => {
  const { name, id } = person;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center">
      <div className="rounded-full w-32 h-32 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl text-gray-600 dark:text-white">
        {index}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">ID: {id}</p>
    </div>
  );
};

export default AboutMe;
