import { Card } from "@mui/material";

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
      <Card sx={{ width: "400px", p: "30px", textAlign: "center" }}>
        <img
          style={{ width: "100%", borderRadius: "400px" }}
          src="https://steamuserimages-a.akamaihd.net/ugc/170412655659465026/9D6C188AFF8F415A929DDCE546ACF1A8F0D58256/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        />
        <p style={{ fontSize: "30px", fontWeight: "600" }}>
          YOU PICK THE WRONG HOUSE FOOL!!!
        </p>
        <p>404 NOT FOUND</p>
      </Card>
    </div>
  );
};

export default NotFound;
