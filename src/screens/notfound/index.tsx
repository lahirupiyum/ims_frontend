import NotFoundGIF from "../../assets/images/not_found.gif";

const NotFound = () => {
  return (
    <div
      style={{
        backgroundColor: "#e9e9e9",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <img src={NotFoundGIF} />
    </div>
  );
};

export default NotFound;
