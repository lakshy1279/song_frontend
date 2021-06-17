import React, { Component } from "react";
import { ReactVideo, YoutubePlayer } from "reactjs-media";
class Songfront extends Component {
  render() {
    const post = this.props.post;
    return (
      <div className="songbox">
        <div className="video-left">
          <ReactVideo
            className="video-play"
            src={post.video}
            poster={post.thumbnail}
          />
        </div>
        <div className="video-right">
          <span className="text-styling">Movie Name : {post.movieName}</span>
          <br></br>
          <span
            style={{
              marginLeft: "13px",
              fontSize: "20px",
              display: "inline-block",
            }}
          >
            Language : {post.language}
          </span>
          <span
            style={{
              marginLeft: "13px",
              fontSize: "20px",
              display: "inline-block",
              color: "#ef7917",
            }}
          >
            Release Date : {post.releaseDate}
          </span>
        </div>
      </div>
    );
  }
}

export default Songfront;
