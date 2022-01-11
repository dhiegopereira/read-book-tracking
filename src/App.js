import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {getAll} from "./services/booksAPI";
import { ListBooks } from "./components/Book";
import Search from "./components/Search";

function App() {

  const [books, setBooks] = React.useState([]);
  const shelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
  ]

  const onChangeShelf = (book, shelf) => {
    setBooks(
      books.map(b => b.id === book.id ? { ...b, shelf } : b)
    )

    if (shelf === 'none') {
      setBooks(state => {
        const books = state.filter(b => b.id !== book.id);
        return books;
      })
    }
  }

  React.useEffect(() => {   
    const body = getAll();
    body.then(data => setBooks(data));
  }, []);

  return (
    <div className="app">
      tesate
       <Router>
         <Routes>
          <Route path='/search' element={<Search books={books} onChangeShelf={onChangeShelf} />} />
          <Route exact path='/' element={<ListBooks books={books} shelves={shelves} onChangeShelf={onChangeShelf} />} />
          </Routes>
       </Router>
    </div>
  );
}

export default App;
