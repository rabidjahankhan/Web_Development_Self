import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTION from "../question";

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTION[index].answers[0]);

    const skippedPercentage = ((skippedAnswers.length / userAnswers.length) * 100).toFixed(0);

    const correctPercentage = ((correctAnswers.length / userAnswers.length) * 100).toFixed(0);

    const incorrectPercentage = (100 - skippedPercentage - correctPercentage).toFixed(0);


  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
            let cssClass = 'user-answer';

            if(answer === null) {
                cssClass += ' skipped';
            } else if (answer === QUESTION[index].answers[0]) {
                cssClass += ' correct';
            } else {
                cssClass += ' wrong';
            }


          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTION[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
