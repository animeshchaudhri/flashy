import { Link } from "react-router-dom";

export const FlashcardItem = ({
  image,
  avatar,
  title,
  subtitle,
  time,
  rating,
  action,
  id,
}: {
  image: string;
  avatar: string;
  title: string;
  subtitle: string;
  time: string;
  rating: string;
  action: string;
  id: number;
}) => (
  
  <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="relative h-32">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-2 bg-gray-800 rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-2">
        <img src={avatar} alt={title} className="w-6 h-6 rounded-full" />
        <span className="text-sm font-medium text-gray-300">{title}</span>
      </div>
      <h3 className="font-bold mb-2 text-white">{subtitle}</h3>
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {time}
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          {rating}
        </div>
      </div>
      <Link to={`/cards?id=${id}`}>
      <button className="w-full py-2 px-4 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {action}
      </button>
      </Link>
    </div>
  </div>
);
