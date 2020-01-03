import React, { useState } from 'react'
import './App.css'
import request from 'request'

// var tmp_search_result = {"Search":[{"Title":"Iron Man","Year":"2008","imdbID":"tt0371746","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"},{"Title":"Iron Man 3","Year":"2013","imdbID":"tt1300854","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg"},{"Title":"Iron Man 2","Year":"2010","imdbID":"tt1228705","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg"},{"Title":"The Iron Giant","Year":"1999","imdbID":"tt0129167","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjIxNDU2Njk0OV5BMl5BanBnXkFtZTgwODc3Njc3NjE@._V1_SX300.jpg"},{"Title":"The Man in the Iron Mask","Year":"1998","imdbID":"tt0120744","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZjM2YzcxMmQtOTc2Mi00YjdhLWFlZjUtNmFmMDQzYzU2YTk5L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Iron Fist","Year":"2017–2018","imdbID":"tt3322310","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMjI5Mjg1NDcyOV5BMl5BanBnXkFtZTgwMjAxOTQ5MTI@._V1_SX300.jpg"},{"Title":"The Iron Lady","Year":"2011","imdbID":"tt1007029","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BODEzNDUyMDE3NF5BMl5BanBnXkFtZTcwMTgzOTg3Ng@@._V1_SX300.jpg"},{"Title":"Iron Sky","Year":"2012","imdbID":"tt1034314","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTM2MDg5MzgxNF5BMl5BanBnXkFtZTcwODUzNjMxOA@@._V1_SX300.jpg"},{"Title":"The Man with the Iron Fists","Year":"2012","imdbID":"tt1258972","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTg5ODI3ODkzOV5BMl5BanBnXkFtZTcwMTQxNjUwOA@@._V1_SX300.jpg"},{"Title":"3-Iron","Year":"2004","imdbID":"tt0423866","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTM1ODIwNzM5OV5BMl5BanBnXkFtZTcwNjk5MDkyMQ@@._V1_SX300.jpg"}],"totalResults":"588","Response":"True"}

function Movie(props) {
  return (
    <li className="movie_frame">
      <h1 className="movie_title" title={props.title}>{props.title}</h1>
      <img className="movie_poster" src={props.poster} alt={props.title}></img>
      <p className="movie_year">({props.year})</p>
    </li>
  )
}

function App() {
  const [title, setTitle] = useState("")
  const [result, setResult] = useState([])

  let handleChange = event => {
    setTitle(event.target.value)
  }

  let handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleSearch()
    }
  }

  let handleSearch = () => {
    let tmp_list = {}

    request({
      url: "https://www.omdbapi.com:443/?apikey=58b0f6d3&s="+title,
      json: true,
    }, (err, res, body) => {
      if (body.Response !== "False") {
        for (let movie of body.Search) {
          tmp_list[movie.imdbID] = <Movie key={movie.imdbID} title={movie.Title} poster={movie.Poster} year={movie.Year} />
        }
        setResult(Object.values(tmp_list))
      }
    })
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="header_title">HOOKED</h1>
      </div>
      <div className="searchbar">
        <input className="search_input" value={title} onChange={handleChange} onKeyDown={handleKeyDown}/>
        <div className="search_submit" onClick={handleSearch}>SEARCH</div>
      </div>
      <span className="foo">Sharing a few of our favourite movies</span>
      <div className="search_result">
        <ul>{result}</ul>
      </div>
    </div>
  )
}

export default App;
