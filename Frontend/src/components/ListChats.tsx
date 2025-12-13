interface Props {
  chats: { id: number; name: string; lastMsg: string }[];
}

const ListChats = ({ chats }: Props) => {
  return (
    <div className="bg-white/90 w-full h-3/4 rounded-2xl p-3 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Your Chats</h2>

      <div className="flex flex-col gap-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-3 rounded-xl bg-white shadow hover:bg-gray-100 cursor-pointer transition"
          >
            <p className="font-medium text-gray-800">{chat.name}</p>
            <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListChats;
