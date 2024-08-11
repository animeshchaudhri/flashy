import { useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

function Signout() {
  const { signOut } = useClerk();
  useEffect(() => {
    signOut();
    redirect("/");
  }, []);
  return <div></div>;
}

export default Signout;
