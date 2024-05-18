const SkeletonRoomCard = () => {
  return (
    <div className="p-4 border rounded shadow flex animate-pulse">
      <div className="flex-shrink-0 mr-10">
        <div className="w-72 h-48 bg-gray-300 rounded mb-4"></div>
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded"></div>
          <div className="w-16 h-16 bg-gray-300 rounded"></div>
          <div className="w-16 h-16 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="flex-grow">
        <div className="h-6 bg-gray-300 rounded mb-2 w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonRoomCard;
