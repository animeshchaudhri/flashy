import { useSearchParams } from "react-router-dom";
import UserCards from "../../components/user/UserCards";

function CardPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const numericId = parseInt(id || "3", 10);

  return <UserCards id={numericId} />;
}

export default CardPage;
