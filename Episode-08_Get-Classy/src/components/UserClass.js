import React from 'react';

class UserClass extends React.Component{
    //Constructor is used to initialize state and bind methods
    
    constructor(props) {
        super(props);
        //how to write state variable in class based component
        this.state = {
            count:0,
        }
        console.log(this.props.name+" Constructor Called");
    }
    
    componentDidMount(){
        console.log(this.props.name+" Component Did Mount Called");
    }

    render() {
        console.log(this.props.name+" Render Called");
        const {name,age,location}=this.props;
        return (
            <div className='user-card'>
                <h1>Count={this.state.count}</h1>
                <button onClick={()=>{
                    //this is how we update state in class based component
                    //this.setState is an asynchronous function
                    this.setState({
                        count:this.state.count + 1,
                    })
                }}>Count Increase</button>
                <h2>User Class Component</h2>
                <h2>{name}</h2>
                <p>{age}</p>
                <h4>Location: {location}</h4>
                <h4>https://github.com/Balajee2k</h4>
            </div>
        );
    }
}

export default UserClass;