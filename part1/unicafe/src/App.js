import {useState} from 'react';

const Heading = ({text}) => <h1>{text}</h1>
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({text, value}) => <p>{text} {value}</p>
const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>
  }
  return (<>
    <StatisticLine text="good" value={props.good} />
    <StatisticLine text="neutral" value={props.neutral} />
    <StatisticLine text="bad" value={props.bad} />
    <StatisticLine text="all" value={props.all} />
    <StatisticLine text="average" value={props.average} />
    <StatisticLine text="positive" value={props.positive + " %"} />
  </>)
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all * 100;

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />

      <Heading text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App;
