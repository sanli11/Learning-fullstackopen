const Name = (props) => {
  console.log(props);
  
  return <h2>{props.name}, {props.age} YO</h2>
}

const App = () => {
  const a = 10;
  const b = 15;

  const now = new Date();
  console.log("Current time is " + now);

  return (
    <div>
      <h1>Hello</h1>
      <Name name={'SanLi'} age={a+b}/>

      <p><b>{a} + {b} = {a + b}</b></p>
      <p>Calculated at {now.toString()}</p>
    </div>
  );
};

export default App;