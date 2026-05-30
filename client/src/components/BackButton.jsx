import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 mb-6 text-white bg-indigo-600 rounded-xl"
    >
      ← Back
    </button>
  );
}

export default BackButton;