import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchDemo = ({ subreddit }) => {
  // Initially, "posts" is an empty array
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    // API endpoint
    const url = `http://www.reddit.com/r/${subreddit}.json`;
    axios.get(url)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        setPosts(posts);
      });
  }, [subreddit]);

  return (
    <div>
      <h1>/r/{subreddit}</h1>
      <ul>
        {
          posts.map(post => 
            <li key={post.id}>
              <a href={post.url}>
                {post.title}
              </a>
            </li>
          )
        }
      </ul>
    </div>
  );
};

class FetchDemoClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] };
  }

  fetchData() {
    // API endpoint
    const url = `http://www.reddit.com/r/${this.props.subreddit}.json`;
    axios.get(url)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { subreddit } = this.props;
    const { posts } = this.state;
    return (
      <div>
        <h1>/r/{subreddit}</h1>
        <ul>
          {
            posts.map(post => 
              <li key={post.id}>
                <a href={post.url}>
                  {post.title}
                </a>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default FetchDemoClass;
