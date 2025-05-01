// pages/CreateQuiz.js
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{
    text: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  }]);

  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'quizzes'), {
      title,
      questions,
      createdAt: new Date(),
      createdBy: auth.currentUser.uid
    });
    setTitle('');
    setQuestions([{ text: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz Title"
        required
      />
      
      {questions.map((question, index) => (
        <div key={index} className="question-form">
          <textarea
            value={question.text}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].text = e.target.value;
              setQuestions(newQuestions);
            }}
            placeholder="Question text"
            required
          />
          
          {question.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].options[oIndex] = e.target.value;
                setQuestions(newQuestions);
              }}
              placeholder={`Option ${oIndex + 1}`}
              required
            />
          ))}
          
          <select
            value={question.correctAnswer}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].correctAnswer = e.target.value;
              setQuestions(newQuestions);
            }}
            required
          >
            <option value="">Select Correct Answer</option>
            {question.options.map((option, oIndex) => (
              <option key={oIndex} value={option}>
                Option {oIndex + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default CreateQuiz;