import { search } from '../../services/booksAPI';
import React from 'react';
import Home from '../../pages/Home';
import Book from '../../components/Book';

export default function Search(props) {

    const [searchResults, setSearchResults] = React.useState([]);
    const [value, setValue] = React.useState('');

    const handleChange = event => {
        setValue(event.target.value);

        if (value.length > 0 ) {
            search(value).then(books => {
                if (books.error) {
                    setSearchResults([]);
                } else {
                    setSearchResults(books);
                }
            });        
        } else {
            setSearchResults([]);
        }
    }

    const resetSearch = () => {
        setValue('');
        setSearchResults([]);
    }

    React.useEffect(() => {
        searchResults.forEach(searchedBook => {
            props.books.forEach(book => {
                if (searchedBook.id === book.id) {
                    searchedBook.shelf = book.shelf;
                }
            });
            if (searchedBook.shelf) {
                searchedBook.shelf = 'none'
            }
        });
    }, [searchResults]);
   
    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Home resetSearch={resetSearch} />
            <div className="search-books-input-wrapper">

                <input type="text" placeholder="Search by title or author" value={value} onChange={handleChange} />

            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                {searchResults.map(book => (
                <Book key={book.id} book={book} onChangeShelf={props.onChangeShelf} />
                ))}
            </ol>
            </div>
        </div>
    );
}