import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Page(props) {
  return (
    <div className='flex flex-col w-full bg-slate-800 min-h-screen'>
      <Header></Header>
      <main className='mx-auto w-[95%] bg-slate-200 max-w-screen-lg shadow-lg shadow-black mt-20 mb-6 rounded-2xl relative'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Page;
