// src/components/LoadingScreen.jsx
import "../styles/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div></div><div></div><div></div><div></div>
      </div>
      <p>Signing you up, please wait...</p>
    </div>
  );
};

export default LoadingScreen;
