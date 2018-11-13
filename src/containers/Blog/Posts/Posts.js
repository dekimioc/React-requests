import React, { Component } from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

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
        this.setState({selectedPostId: id})
    }

    render() {
        let posts = <p style={{textAlign: "center"}}>Something isn't OK!</p>;
        if ( !this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.clickedPostHandler(post.id)}/>
        })
    }
        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;