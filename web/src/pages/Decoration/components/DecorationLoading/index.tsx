export const DecorationLoading: React.FC = () => {
  return (
    <div className="mx-96 my-5 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-lg w-1/2 mb-4"></div>
      <div className="flex items-center">
        <div className="h-4 bg-gray-200 rounded-full w-1/12 mb-4 mr-1"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/12 mb-4 ml-1"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-4 ml-5"></div>
      </div>
      <div className="flex items-center">
        <div className="h-[28rem] bg-gray-200 rounded-tl-lg rounded-bl-lg w-1/2 mb-4 mr-1"></div>
        <div className="h-[28rem] grid grid-cols-2 gap-2 rounded-lg w-1/2 mb-4 ml-1">
          <div className="bg-gray-200"></div>
          <div className="bg-gray-200 rounded-tr-lg"></div>
          <div className="bg-gray-200"></div>
          <div className="bg-gray-200 rounded-br-lg"></div>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3">
          <div className="h-8 bg-gray-200 rounded-lg mb-4 mr-1"></div>
          <div className="h-8 bg-gray-200 w-1/3 rounded-lg mb-4 mr-1"></div>
        </div>
        <div className="h-[26rem] bg-gray-200 rounded-tl-lg rounded-lg w-1/3 mb-4 ml-1"></div>
      </div>
    </div>
  );
};
