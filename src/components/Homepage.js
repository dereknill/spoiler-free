import Header from "./Header";
import Footer from "./Footer";

function Homepage(props) {
  return (
    <div className='flex flex-col w-full bg-neutral-300 min-h-screen'>
      <Header></Header>
      <main className='mx-auto bg-neutral-100 w-full max-w-screen-lg h-96 drop-shadow-lg'></main>
      <Footer></Footer>
    </div>
  );
}

export default Homepage;
