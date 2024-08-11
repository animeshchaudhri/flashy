import { Link } from "react-router-dom";

const CategoryItem = ({
  icon,
  name,
  id,
}: {
  icon: string;
  name: string;
  id: number;
}) => (
  <Link to={`/cards?id=${id}`}>
    <div className="bg-gray-800 rounded-lg flex shadow-md p-4">
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-900 text-indigo-300 rounded-full p-2">
          {icon}
        </div>
        <span className="font-medium  text-gray-300">{name}</span>
      </div>
    </div>
  </Link>
);

export default CategoryItem;
