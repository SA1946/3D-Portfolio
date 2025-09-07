const Menu = ({ onSectionChange, menuOpen, setMenuOpen }) => {
  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className=" text-center z-30 fixed top-10 right-16 p-3 bg-indigo-400 w-11 h-11 rounded-md  hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 "
      >
        <div className="w-full h-full relative  flex flex-col justify-center items-center ">
          <span
            className={` absolute h-0.5  bg-white rounded-md w-full  transition-all duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={` absolute h-0.5 bg-white rounded-md w-full  transition-all duration-300 ease-in-out ${
              menuOpen ? " opacity-0 rotate-180 " : "opacity-100"
            }`}
          ></span>
          <span
            className={` absolute h-0.5 bg-white rounded-md w-full  transition-all duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          ></span>
        </div>
      </button>
      <div
        className={` fixed z-10 inset-y-0 right-0 bg-white transition-all duration-300 flex flex-col
    ${menuOpen ? "w-80" : "w-0"}
         `}
      >
        <div className=" w-full h-full flex flex-col items-start justify-center gap-6 p-8  ">
          <MenuBtn label="About" onClick={() => onSectionChange(0)} />
          <MenuBtn label="Skills" onClick={() => onSectionChange(1)} />
          <MenuBtn label="Project" onClick={() => onSectionChange(2)} />
          <MenuBtn label="Contact" onClick={() => onSectionChange(3)} />
        </div>
      </div>
    </>
  );
};

export default Menu;

const MenuBtn = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors focus:text-indigo-500  focus:underline focus:underline-offset-8 "
    >
      {label}
    </button>
  );
};
