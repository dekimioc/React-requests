import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import axios from '../../../axios';


import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';
class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4); // displaying only first four data
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: "Dejan"
                    }
                })
                this.setState({
                    posts: updatedPosts
                })
               // console.log(response);
            })
            .catch(error => {
               console.log(error);
               //this.setState({error: true});
            })
    }

    clickedPostHandler = (id) => {
        // this.setState({selectedPostId: id})
        this.props.history.push("/posts/" + id);
    }

    render() {
        let posts = <p style={{textAlign: "center"}}>Something isn't OK!</p>;
        if ( !this.state.error) {
            posts = this.state.posts.map(post => {
                return ( 
                // <Link to={'/' + post.id} >
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.clickedPostHandler(post.id)}/>
                // </Link>
                )
        })
    }
        return (
        <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
        </div>
        )
    }
}

export default Posts;