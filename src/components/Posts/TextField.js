import React, {Component} from 'react';


export class TextField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Question:'',
            firebaseRef:null
        };
        this.state.firebaseRef = this.props.db.database().ref("tQuestion");
    }

    componentWillUnmount() {
        this.state.firebaseRef.off();
    }

    pushToFirebase(event) {
        if(this.state.Question===''){
            event.preventDefault();
            alert("Please fill out the question!");
            return;
        }
        const {Question} = this.state;
        //prevent the page to refresh itself
        event.preventDefault();
        // this.state.firebaseRef.child(title).set({className: this.state.className,
        //     user: this.state.user,
        //     title: this.state.title,
        //     content: this.state.content,
        //     like: this.state.like,
        //     dislike: this.state.dislike});
        // this.setState({title: '', content:''});
        alert("You entered:"+this.state.Question);
        this.setState({Question:''});
        console.log(Question);
    }



    render(){
        return(
            <form>


                <br />

                <form>
                    Question:<br />
                    <input type="text" onChange= {e => this.setState({Question: e.target.value})} size="35"/><br />
                </form>
                <button onClick={this.pushToFirebase.bind(this)}>Submit</button>

            </form>

        );
    }
}
