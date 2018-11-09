import React, {Component} from 'react';
import Post from './Post';
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {fetchPosts, likePost} from '../actions/posts-actions';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            allSelected: true,
            users: []
        };
        this.onFetchPosts = this.onFetchPosts.bind(this);
        this.onLike = this.onLike.bind(this);
        this.filterLiked = this.filterLiked.bind(this);
        this.filterAll = this.filterAll.bind(this);
    }

    componentDidMount() {
        this.onFetchPosts();
    }

    //fetch post data from reddit api and then update store
    onFetchPosts() {
        fetch('https://www.reddit.com/r/pics/top/.json')
            .then(results => results.json())
            .then(json => {
                this.props.onFetchPosts(json.data.children);
                this.setState({
                    isLoaded: true,
                })
            });
            fetch('/api/users')
	 			.then(res => res.json())
	 			.then(users => this.setState({users}));
    }

    onLike(id, liked) {
        this.props.onLikePost(id, liked);
    }

    filterLiked() {
        if (this.state.allSelected) {
            this.setState({allSelected: false});
        }
    }

    filterAll() {
        if (!this.state.allSelected) {
            this.setState({allSelected: true});
        }
    }

    render() {
    	
        const {isLoaded, allSelected} = this.state;

        //check the state of the all/liked filter and filter/map posts accordingly
        var posts = [];
        if (allSelected) {
            posts = this.props.posts.map((post) => {
                return <Post onLike={this.onLike} key={post.data.id} post={post.data}/>;
            });
        } else {
            posts = this.props.posts.filter(post => post.data.liked).map(post => <Post onLike={this.onLike}
                                                                                       key={post.data.id}
                                                                                       post={post.data}/>)
        }

        //styles
        let headerStyle = {display: 'flex', justifyContent: 'center', paddingTop: '2em'};
        let cardStyle = {display: 'flex', justifyContent: 'center', paddingRight: '1em', paddingLeft: '1em'};
        let detailStyle = {display: 'flex', justifyContent: 'center', paddingTop:'1em', paddingBottom:'1em'};

        if (!isLoaded) {
            return <div style={headerStyle}>Loading...</div>
        } else {
            return (
                <div>
                    <div>
                        <div style={headerStyle}>
                            <h1 className="ui header">Top posts from r/pics</h1>
                        </div>
                        <div style={detailStyle}>
                       		(was originally 'r/surfing', but there was questionable content)
                       	</div>
                        <div style={detailStyle}>
                            <Button active={this.state.allSelected} onClick={this.filterAll}
                                    attached='left'>All</Button>
                            <Button active={!this.state.allSelected} onClick={this.filterLiked}
                                    attached='right'>Liked</Button>
                        </div>
                    </div>
                    <div>
                        {posts.length === 0 ?
                            <div style={headerStyle}>You haven't liked any posts!</div>
                            :
                            <div className="ui link cards" style={cardStyle}>
                                {posts}
                            </div>
                        }
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
};

const mapActionsToProps = {
    onFetchPosts: fetchPosts,
    onLikePost: likePost
};

export default connect(mapStateToProps, mapActionsToProps)(App);

