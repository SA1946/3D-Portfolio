import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./MyProjects";
import { useForm, ValidationError } from "@formspree/react";

const Interface = ({ setSection }) => {
  return (
    <div className="w-screen">
      <About setSection={setSection} />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Interface;

const Section = ({ children, mobilePhoneTop }) => {
  return (
    <motion.section
      className={`min-h-screen px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto flex flex-col items-start ${
        mobilePhoneTop ? "justify-start md:justify-center" : "justify-center"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  );
};

function About({ setSection }) {
  return (
    <Section mobilePhoneTop>
      <h1 className="text-4xl md:text-6xl text-gray-900  font-extrabold leading-snug mt-8 md:mt-1">
        Hii, I'm
        <br />
        <span className="text-teal-500 px-1 italic">Meas Reaksa</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        I'm a student who's learning frontend Dev,
        <br />
        Currently I'm really curious about WebGL and 3D.
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-500 text-white px-5 py-3 text-base  md:px-8 md:py-3 md:text-lg font-bold rounded-xl mt-4 md:mt-10`}
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
      <div className="w-full px-5">
        <h2 className=" text-3xl md:text-5xl font-bold text-gray-100 ">
          Skills
        </h2>
        <div className="space-y-4 mt-8">
          {skills.map((skill, index) => (
            <div className=" w-full md:w-64" key={index}>
              <motion.h3
                className=" text-[18px]  md:text-xl font-bold  text-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2  rounded-s-full bg-gray-100">
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
      <div className="w-full px-5 ">
        <h2 className=" text-3xl  md:text-5xl font-bold mt-10 text-gray-100 ">
          Langauges
        </h2>
        <div className="space-y-4 mt-8">
          {langauges.map((lang, index) => (
            <div className=" w-full md:w-64" key={index}>
              <motion.h3
                className="text-xl font-bold  text-gray-200 "
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 + index * 0.2 }}
              >
                {lang.title}
              </motion.h3>
              <div className="h-2 rounded-s-full bg-gray-100">
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

function Projects() {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const nextProject = () =>
    setCurrentProject((currentProject + 1) % projects.length);

  const prevProject = () =>
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center mt-10">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={prevProject}
        >
          ← Previous
        </button>
        <h2 className="text-5xl font-bold">Projects</h2>
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
}

const Contact = () => {
  const [state, handleSubmit] = useForm("xyzdoybv");
  return (
    <Section>
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Get in Touch
      </motion.h1>
      <motion.div
        className="w-full max-w-md bg-white bg-opacity-40 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {state.succeeded ? (
          <p className="text-center text-lg text-gray-900">
            Kom spam ha nh use library te🥲
            <a
              target="_blank"
              className="underline "
              href="https://formspree.io/"
            >
              @formspree/react
            </a>
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                placeholder="Your name"
                required
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                placeholder="your.email@example.com"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-y transition-colors duration-300"
                placeholder="Your message..."
                required
              />
              <ValidationError
                className="mt-1 text-red-700"
                errors={state.errors}
              />
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className={`w-full py-3 px-6 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300`}
            >
              Submit
            </button>
          </form>
        )}
      </motion.div>
    </Section>
  );
};
