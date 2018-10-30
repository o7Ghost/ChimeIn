import React, {Component} from 'react';


export class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            className:'default',
            user: '',
            title: '',
            content:'',
            like:0,
            dislike:0,
            posts:[],
            firebaseRef:null
        };
        this.state.user = this.props.currentUser;
        this.state.firebaseRef = this.props.db.database().ref(this.state.className);
        this.state.firebaseRef.on('value', dataSnapshot => {
            let posts = [];
            dataSnapshot.forEach(childSnapshot => {
                let post = childSnapshot.val();
                post['.key'] = childSnapshot.key;
                posts.push(post);
            });
            this.setState({posts});
        });
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount() {
        this.state.firebaseRef.off();
    }

    pushToFirebase(event) {
        if(this.state.title==='' || this.state.content===''){
            alert("Please fill out both tilte and content!");
            return;
        }
        const {className,user,title,content,like,dislike} = this.state;
        //prevent the page to refresh itself
        event.preventDefault();
        this.state.firebaseRef.child(title).set({className: this.state.className,
                                            user: this.state.user,
                                            title: this.state.title,
                                            content: this.state.content,
                                            like: this.state.like,
                                            dislike: this.state.dislike});
        this.setState({title: '', content:''});
    }

    handleChange(event) {
        console.log("--------------"+event.target.value+"--------------");
        this.setState({ className: event.target.value });
        const newFirebaseRef = this.props.db.database().ref(event.target.value);
        this.setState({firebaseRef:newFirebaseRef});
        newFirebaseRef.on('value', dataSnapshot => {
            let posts = [];
            dataSnapshot.forEach(childSnapshot => {
                let post = childSnapshot.val();
                post['.key'] = childSnapshot.key;
                posts.push(post);
            });
            this.setState({posts});
        });
    }

    increaseLike(title,currentLike){
        console.log("Adding "+title+" with one like");
        this.state.firebaseRef.child(title).update({like:currentLike+1});
    }

    increaseDislike(title,currentDislike){
        console.log("Adding "+title+" with one dislike");
        this.state.firebaseRef.child(title).update({dislike:currentDislike+1});
    }


    render(){
        const records = this.state.posts.map(post =>

                    <div key={post.title} style={{border: '5px solid',borderColor:'black',marginTop:'10px'}}>
                        <p> <b>{post.title}</b>     by {post.user}</p>
                        <p>Q: {post.content}</p>
                        <button onClick={() => this.increaseLike(post.title,post.like)}>like:{post.like}</button>
                        <button onClick={() => this.increaseDislike(post.title,post.dislike)}>dislike:{post.dislike}</button>
                        <br/>
                    </div>

        );
        return(
            <div>
                <p>Course selection:
                <select value={this.state.className} onChange={this.handleChange}>
                    <option value="default"></option>
                    <option value="class1">class1</option>
                    <option value="class2">class2</option>
                    <option value="class3">class3</option>
                    <option value="class4">class4</option>
                </select>
                </p>
                {this.state.className==="default"?
                    <div>
                        <p>Haven't choose any class yet</p>
                    </div>
                    :
                    <div>
                        <div style={{paddingTop: '20px'}}>
                            {records}
                            <br />
                            <label>title</label>
                            <input type="text" onChange= {e => this.setState({title: e.target.value})} size="35"/>
                            <br />
                            <label>content</label>
                            <input type="text" onChange= {e => this.setState({content: e.target.value})} size="35"/>
                            <br />
                            <button onClick={this.pushToFirebase.bind(this)}>Submit</button>
                        </div>
                    </div>
                }

            </div>

        );
    }
}
