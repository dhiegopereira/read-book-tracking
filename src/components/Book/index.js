import React from 'react';
import Search from '../../pages/Search';

function BookControl(props){
    const [value, setValue] = React.useState(props.book.shelf);

    const handleChange = event => {
        setValue(event.target.value);
        props.onChangeShelf(props.book, event.target.value);
    }
    return(
        <div className="book-shelf-changer">
            <select value={value} onChange={handleChange} >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
        </div>
    )
}

function Bookshelf(props){
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf.name}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map(book => (
                <Book key={book.id} book={book} onChangeShelf={props.onChangeShelf} />
                ))}
            </ol>
            </div>
        </div>
    );
}

export function ListBooks(props) {
    
    function booksOnShelf(shelf) {
        return props.books.filter(book => book.shelf === shelf.key)
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
             <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {props.shelves.map(shelf => (
                    <Bookshelf key={shelf.key} shelf={shelf} books={booksOnShelf(shelf)} onChangeShelf={props.onChangeShelf} />
                    ))}
                </div>
            </div>
            <Search />
        </div>
    )
}

export default function Book(props){
    return (
        <li>
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks &&
                props.book.imageLinks.thumbnail})` }}></div>
                <BookControl book={props.book} onChangeShelf={props.onChangeShelf} />
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors && props.book.authors.join(', ')}</div>
            </div>
        </li>
    )
}