import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div class="flex items-start bg-slate-700 w-dvw h-15 fixed top-0 justify-between">
      <h1 class="font-bold text-gray-300 text-2xl pl-5 pt-7">All chats</h1>
      <button
        class="p-3 bg-cyan-600 mt-5 mr-5 rounded-2xl text-white active:bg-cyan-700"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </div>
  );
}
