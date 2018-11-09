import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';

class Post extends Component {

    constructor(props) {
        super(props);

        this.clickCard = this.clickCard.bind(this);
        this.likeClicked = this.likeClicked.bind(this);
    }

    //Function triggered when a card is clicked, and re-directs user to reddit post
    clickCard() {
        window.location.assign('https://www.reddit.com' + this.props.post.permalink);
    }

    //Calls onLike post-action when a post is liked/unliked
    likeClicked() {
        var liked = true;
        if (this.props.post.liked === true) {
            liked = false;
        }
        this.props.onLike(this.props.post.id, liked);
    }

    render() {

        //Fix encoding for image url
        var picUrl = '';
        if(this.props.post.preview){
            var image = this.props.post.preview.images[0].source.url;
            picUrl = image.replace('amp;s', 's');
        }

        return (
            //Populate Card with post info
            //Check the type of post and only set the image if it contains one
            <Card>
                {this.props.post.preview ?
                    <div className="image">
                        <img src={picUrl} alt="Missing thumbnail"/>
                    </div>
                    :
                    <div></div>
                }
                <Card.Content>
                    <Card.Header><a
                        href={'https://www.reddit.com' + this.props.post.permalink}>{this.props.post.title}</a></Card.Header>
                    <Card.Meta>{this.props.post.author}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <div style={{display: 'inline'}}>Score: {this.props.post.score}</div>
                    {this.props.post.liked === true ?
                        <button className='ui green button' style={{float: 'right'}}
                                onClick={this.likeClicked}>Unlike</button>
                        :
                        <button className='ui grey button' style={{float: 'right'}}
                                onClick={this.likeClicked}>Like</button>
                    }
                </Card.Content>
            </Card>
        );
    }
}

export default Post;

	// componentDidMount(){
	// 	fetch('/api/users')
	// 		.then(res => res.json())
	// 		.then(users => this.setState({users}));
	// }