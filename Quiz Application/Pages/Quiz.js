
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizDoc = await getDoc(doc(db, 'quizzes', id));
      if (quizDoc.exists()) {
        setQuiz(quizDoc.data());
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = (answer) => {
    const newAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(newAnswers);

    if (answer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>
      <div className="question">
        <h3>Question {currentQuestion + 1}</h3>
        <p>{quiz.questions[currentQuestion].text}</p>
        <div className="options">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;