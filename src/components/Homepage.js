import PosterCarousel from "./PosterCarousel";
import MainBackdrop from "./MainBackdrop";
function Homepage(props) {
  return (
    <div className='pb-10'>
      <MainBackdrop></MainBackdrop>
      <PosterCarousel
        category='tv/popular'
        displayTitle='Popular'
      ></PosterCarousel>
      <PosterCarousel
        category='trending/tv/week'
        displayTitle='Trending'
      ></PosterCarousel>
      <PosterCarousel
        category='tv/on_the_air'
        displayTitle='Airing this week'
      ></PosterCarousel>
    </div>
  );
}

export default Homepage;
