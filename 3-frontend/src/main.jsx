import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";

// using dummy data
// const notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <App notes={notes} />
// );

// using axios to fetch data from server
// axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <App notes={notes} />
//   );
// });

// passing no data to App
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
