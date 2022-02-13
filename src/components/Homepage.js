import Header from "./Header";
import Footer from "./Footer";

function Homepage(props) {
  return (
    <div className='flex flex-col w-full bg-zinc-200 min-h-screen'>
      <Header></Header>
      <Footer></Footer>
    </div>
  );
}

export default Homepage;
