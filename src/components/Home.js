import React, { Component } from "react";
import { ReactVideo, YoutubePlayer } from "reactjs-media";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Songfront from "./Songfront";
class Home extends Component {
  render() {
    //console.log('home props',this.props);
    //this.props.fetch();
    const data = this.props.store.getState();
    //console.log('home prop data',data);
    return (
      <div>
        <Link to="/upload" style={{ fontSize: "30px", color: "#ef7917" }}>
          Upload Your Song Here
        </Link>

        {data.map((post) => (
          <Songfront post={post} />
        ))}
      </div>
    );
  }
}

export default Home;
