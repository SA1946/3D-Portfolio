
import { motion } from "framer-motion";

const Interface = () => {
  return (
    <div className="w-screen">
      <About />
      <Skills />
      <Section>project</Section>
      <Contact />
    </div>
  );
};

export default Interface;

const Section = ({ children }) => {
  return (
    <motion.section
      className="h-screen max-w-screen-xl mx-auto flex flex-col items-start justify-center"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        delay: 0.6,
      }}
    >
      {children}
    </motion.section>
  );
};

function About() {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Meas Reaksa</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        I am a frontend developers
        <br />
        Currently I am learning WebGl and 3D
      </motion.p>
      <motion.button
        className={`bg-teal-500 text-white px-8 py-3 text-lg font-bold rounded-xl mt-10`}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Get in touch
      </motion.button>
    </Section>
  );
}
function Skills() {
  const skills = [
    {
      title: "Vanilla JavaScript",
      level: 70,
    },
    {
      title: "ReactJS",
      level: 70,
    },
    {
      title: "Tailwindcss",
      level: 89,
    },
    {
      title: "Threejs / React Three Fiber",
      level: 30,
    },
    {
      title: "Java, Cpp, Python",
      level: 40,
    },
  ];
  const langauges = [
    {
      title: "Khmer ",
      level: 100,
    },
    {
      title: "English",
      level: 50,
    },
  ];
  return (
    <Section>
      <div>
        <h2 className="text-5xl font-bold">Skills</h2>
        <div className="space-y-4 mt-8">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold  text-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2  rounded-s-full bg-gray-200">
                <motion.div
                  className=" h-full w-auto bg-indigo-400 rounded-full"
                  style={{ width: `${skill.level}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-bold mt-10">Langauges</h2>
        <div className="space-y-4 mt-8">
          {langauges.map((lang, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold  text-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 + index * 0.2 }}
              >
                {lang.title}
              </motion.h3>
              <div className="h-2 rounded-s-full bg-gray-200">
                <motion.div
                  className=" h-full w-auto bg-indigo-400 rounded-full"
                  style={{ width: `${lang.level}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 + index * 0.2 }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
function Contact() {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">Contact me </h1>
      <div className="mt-8 p-8 bg-slate-300 w-96 rounded-sm">
        <form action="">
          <label htmlFor="name" className="text-gray-800 block mb-1 ">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full h-8 block shadow-sm border-0 rounded-sm ring-1 ring-inset ring-cyan-700"
          />
          <label htmlFor="email" className="text-gray-800 block mb-1 mt-7 ">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="w-full h-8 block shadow-sm border-0 rounded-sm  ring-1 ring-inset ring-cyan-700  "
          />
          <label htmlFor="message" className="text-gray-800 block mb-1 mt-6">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 block w-full rounded-md border-0 ring-2 ring-cyan-700 text-gray-800 "
          ></textarea>
          <button className="mt-8 bg-indigo-500 text-white py-3 px-8 rounded-lg font-bold text-lg">
            Submit
          </button>
        </form>
      </div>
    </Section>
  );
}
