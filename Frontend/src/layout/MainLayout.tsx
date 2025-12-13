import { Outlet } from "react-router-dom";
import Background from "../assets/Lunada.jpg";

const MainLayout = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-11/12 h-[95vh] max-w-md sm:w-3/4 md:w-1/2 lg:w-2/5 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col gap-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
