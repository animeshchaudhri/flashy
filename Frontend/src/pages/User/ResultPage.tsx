import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ResultPage() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    const correct = parseInt(
      localStorage.getItem("globalCorrectAnswers") || "0",
      10
    );
    const incorrect = parseInt(
      localStorage.getItem("globalIncorrectAnswers") || "0",
      10
    );
    console.log(correct, incorrect);
    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
  }, []);

  const data = [
    {
      name: "Flashcard Results",
      correct: correctAnswers,
      incorrect: incorrectAnswers,
    },
  ];
  const { user } = useUser();
  return (
    <>
      <div className="flex flex-col  p-8 max-w-2xl justify-center place-content-center text-white">
        <h1 className="text-3xl text-left font-bold mb-4">Results</h1>
        <h1 className="text-3xl  text-center font-bold mb-4">
          user: {user?.firstName}
        </h1>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="correct" fill="#82ca9d" name="Correct" />
            <Bar dataKey="incorrect" fill="#8884d8" name="Incorrect" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default ResultPage;
