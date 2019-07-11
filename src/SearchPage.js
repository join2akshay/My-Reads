import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Book'

export default  class SearchPage extends Component
{
    state={
        querry:'',
        searchedBooks:[]
    }
    updateQuerry=(e)=>{
        this.setState({querry:e.target.value})
        console.log(e.target.value)
         this.updateSearchedBooks(e.target.value);
    }
    

    updateSearchedBooks = (query) => {
        if(query){
          BooksAPI.search(query).then((searchedBooks) => {
            if (searchedBooks.error){
              this.setState({searchedBooks: []});
            } else {
              this.setState({searchedBooks: searchedBooks});
            }
        
          })
        } else {
          this.setState({ searchedBooks: []});
        }
       
    
    }

    render() {
        return (
          
              <div className="search-books">
           <div className="search-books-bar">
            <Link to='/'>
             <button className="close-search">Close</button>

            </Link>
             <div className="search-books-input-wrapper">
               
                
               
               <input type="text" placeholder="Search by title or author" onChange={this.updateQuerry}/>

             </div>
           </div>
           <div className="search-books-results">
             <ol className="books-grid">

                {this.state.searchedBooks.map(searchedBook => {
                    let shelf ="none";
                    this.props.books.map(book => (
                        book.id === searchedBook.id ?
                        shelf = book.shelf :''));
                    return (
                    <li key ={searchedBook.id} >
                    <Books
                        book ={searchedBook}
                        moveBooks = {this.props.moveBooks}
                        currentShelf = {shelf}
                    />
                    </li>
                    );
                    })
                }   
             </ol>
           </div>
         </div>
        )
    }
}