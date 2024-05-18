import React from "react";
import pasfoto from "../assets/pasfoto.png";

const AboutMe = () => {
  return (
    <div className="container mx-auto px-10 py-10 bg-gray-100 dark:bg-gray-900 rounded-md shadow-md">
      <div className="flex items-start mb-8 animate-fade-in">
        <img
          src={pasfoto}
          alt="Naufal Rusyda Santosa"
          className="w-64 h-64 rounded-full mr-8 shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold dark:text-white animate-fade-in-right mb-4">
            About Me
          </h1>
          <div className="mb-4 animate-fade-in-up">
            <h2 className="text-xl font-semibold dark:text-white">Name:</h2>
            <p className="dark:text-gray-300 text-lg">Naufal Rusyda Santosa</p>
          </div>
          <div className="mb-4 animate-fade-in-up">
            <h2 className="text-xl font-semibold dark:text-white">Major:</h2>
            <p className="dark:text-gray-300 text-lg">Computer Engineering</p>
          </div>
          <div className="mb-4 animate-fade-in-up">
            <h2 className="text-xl font-semibold dark:text-white">
              University:
            </h2>
            <p className="dark:text-gray-300 text-lg">
              University of Indonesia
            </p>
          </div>
        </div>
      </div>
      <p className="mb-4 dark:text-gray-300 text-lg animate-fade-in-up">
        As a dedicated computer engineering student at the University of
        Indonesia, I am committed to mastering the principles and practices of
        this dynamic field. Through my coursework, I have developed a strong
        foundation in hardware design, software development, and network
        systems, enabling me to tackle complex problems and devise innovative
        solutions.
      </p>
      <p className="mb-4 dark:text-gray-300 text-lg animate-fade-in-up">
        My particular interest lies in embedded systems and the Internet of
        Things (IoT). I have completed several projects that demonstrate my
        ability to design and implement efficient and effective systems using
        microcontrollers, sensors, and communication protocols. This hands-on
        experience has enhanced my practical knowledge and prepared me for
        real-world challenges.
      </p>
      <p className="mb-4 dark:text-gray-300 text-lg animate-fade-in-up">
        In addition to my technical skills, I am an avid learner who stays
        updated with the latest advancements in technology through workshops,
        hackathons, and seminars. I am also a strong advocate for teamwork and
        collaboration, recognizing that the best solutions often arise from
        diverse perspectives and collective effort.
      </p>
      <p className="dark:text-gray-300 text-lg animate-fade-in-up">
        As I continue my studies and expand my expertise, I am excited about the
        opportunities to contribute to the field of computer engineering and
        make a positive impact through innovation and technology.
      </p>
    </div>
  );
};

export default AboutMe;
