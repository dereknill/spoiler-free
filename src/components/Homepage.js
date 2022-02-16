import Header from "./Header";
import Footer from "./Footer";
import PosterCarousel from "./PosterCarousel";
import { createRef } from "react";

function Homepage(props) {
  let carouselRef = createRef();
  return (
    <div className='flex flex-col w-full bg-slate-700 min-h-screen'>
      <Header></Header>
      <main className='mx-auto w-full bg-slate-800 max-w-screen-lg drop-shadow-lg'>
        <PosterCarousel></PosterCarousel>
        <PosterCarousel></PosterCarousel>
        <PosterCarousel></PosterCarousel>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Homepage;
