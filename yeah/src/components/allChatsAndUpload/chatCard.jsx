import { Link } from "react-router-dom";

export default function ChatCard({ name, msg, chatId }) {
  return (
    <div>
      <Link
        to={`/chat/${chatId}`}
        class="flex flex-row hover:active:bg-gray-100 items-center bg-slate-700 p-3 "
      >
        <label class="p-10 border-1 border-black rounded-full bg-slate-800"></label>
        <div class="flex flex-col items-start pl-2">
          <div class="flex flex-row w-dvw justify-between">
            <div class="flex flex-col items-start">
              <p class="font-semibold text-gray-300">{name}</p>
              <p class="font-light text-gray-300">
                Last message will apear here
              </p>
            </div>
            <p class="pr-35 text-gray-300 font-medium">6:14</p>
          </div>
          <p class="font-light pt-3">{msg}</p>
        </div>
      </Link>
    </div>
  );
}
