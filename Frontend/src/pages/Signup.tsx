import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <SignUp path="/sign-up" />
    </div>
  );
};

export default SignUpPage;
