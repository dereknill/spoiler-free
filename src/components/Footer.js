import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer(props) {
  return (
    <footer className='mt-auto bg-black py-2 text-white text-center'>
      <a
        href='https://www.github.com/dereknill'
        target='_blank'
        rel='noreferrer'
      >
        <h4 className='inline mr-2'>Created by Derek Clancy-Nill</h4>
        <FontAwesomeIcon
          icon={faGithub}
          className='margin-0-5'
        ></FontAwesomeIcon>
      </a>
    </footer>
  );
}

export default Footer;
