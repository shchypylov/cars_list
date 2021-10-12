import loader from "../../img/loader.png";

const Loader = () => {
  return (
    <div
      className="d-flex p-5 blinking align-items-center justify-content-center"
      data-testid="loader"
    >
      <img src={loader} alt="Loading..." />
    </div>
  );
};

export default Loader;
