const Hello = (param) => (
  <div>
    <p>Is this being shown? Given parameter is: {param.age} </p>
  </div>
)

const App = () => {
  console.log("This is a console message!");
  const now = new Date();
  const a = 3;
  const b = 4;
  return (<div>
    <p>Hello world</p>
    <p>The time right now is {now.toString()}!</p>
    <p>{a} + {b} = {a + b}</p>
    <Hello age={3} />
    <Hello age={4 + 5}/>
    <Hello age={"4 + 5"} />
    <Hello age={4} />
  </div>)
};

export default App;
