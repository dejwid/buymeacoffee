import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <section className="max-w-lg mx-auto text-center mt-16">
      <div className="text-gray-600">
        <p>
          <FontAwesomeIcon icon={faStar}/>
          <FontAwesomeIcon icon={faStar}/>
          <FontAwesomeIcon icon={faStar}/>
          <FontAwesomeIcon icon={faStar}/>
          <FontAwesomeIcon icon={faStar}/>
        </p>
        <p className="mt-2">Loved by 100,000+ creators</p>
      </div>
      <h1 className="text-6xl font-bold mt-4">
        Fund your<br/>
        creative work
      </h1>
      <h2 className="mt-4 mb-8">
        Accept support for your work.<br/>
        It's easier than you think.
      </h2>
      <button className="bg-yellow-300 px-8 py-4 font-bold rounded-full">
        Start my page
      </button>
    </section>
  );
}
