import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import {Redirect} from 'react-router-dom'
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    
    
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const handleDelete = (event, id) => {
      event.preventDefault()
      const backHome = () =>  <Redirect to='/'/>
      axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(`delted`)
        backHome()
      })
      .catch(err => {
        console.log(`${err}, not deleted`)
      })
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie}  />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={(event)=> {handleDelete(event, this.state.movie.id)}}>DELETE MOVIE</button>
      </div>
    );
  }
}
