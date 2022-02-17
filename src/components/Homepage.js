import Header from "./Header";
import Footer from "./Footer";
import PosterCarousel from "./PosterCarousel";
import MainBackdrop from "./MainBackdrop";
function Homepage(props) {
  return (
    <div className='flex flex-col w-full bg-slate-800 min-h-screen'>
      <Header></Header>
      <main className='mx-auto w-[95%] bg-slate-200 max-w-screen-lg shadow-lg shadow-black my-6 rounded-2xl relative'>
        <MainBackdrop></MainBackdrop>
        <PosterCarousel></PosterCarousel>
        <PosterCarousel></PosterCarousel>
        <PosterCarousel></PosterCarousel>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Homepage;
