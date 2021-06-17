import "./App.css";
import { ReactVideo, YoutubePlayer } from "reactjs-media";
import ReactPlayer from "react-player";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import axios from "axios";

import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    this.fetchData();
    this.props.store.subscribe(() => {
      //console.log('app state',this.props.store.getState());
      this.setState({ state: this.state });
    });
  }
  fetchData = async () => {
    var data = await axios.get("https://backendvideoplayer.herokuapp.com/");
    await this.props.store.dispatch({ type: "fetch", data: data.data.posts });
    //console.log(this.props.store);
  };
  handlefetch = async () => {
    await this.fetchData();
    await this.setState({ state: this.state });
  };

  render() {
    //console.log('render app state',this.props.store.getState());
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={(props) => {
              return <Home store={this.props.store} />;
            }}
          />
          <Route
            exact
            path="/upload"
            render={(props) => {
              return <Upload fetch={this.handlefetch} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
