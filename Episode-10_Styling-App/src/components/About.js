import UserClass from "./UserClass";
import User from "./User";
import React from "react";

class About extends React.Component{
    constructor(props) {
        super(props);
        //Constructor is called when the component is created
        this.state={
            UserInfo:{
            name:"John Doe",
            location:"Default Location",
            }
        }

    }
    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/Balajee2k");
        const json = await data.json();
        console.log(json);
        this.setState({
            UserInfo:json,
        });
    }
    componentDidUpdate(){
        console.log("Component did update");
        // This method is called when the component is updated
    }

    render() {
        const{name,location,avatar_url}=this.state.UserInfo;
        return(
            <div className="user-card">
                <h2>Name:{name}</h2>
                <h2>Location:{location}</h2>
                <img src={avatar_url} alt={name} />
                <h3>Contribution:{this.state.UserInfo.public_repos}</h3>
            </div>
        )
    }

};
export default About;

/*
 Lets understand how the react lifecycle works by first creating About class component from functional:
 -Parent constructor called(with)
 -Parent render called
    -First child constructor called
    -First child render called
    -Second child constructor called
    -Second child render called
     <..Till here render phase is completed..>

    -First child component did mount called
    -Second child component did mount called
-Parent component did mounted Called

*/

/*
Lets undertand how react cycle work with api call and mounting
 ---------Mounting Phase----------
 -Constructor called(with dummy data)
 -Render called(with dummy data)
 Now react update dom with dummy data
 -Component did mount called(with api call and update new data)
 
----------Updating Phase----------
 -Component did update called
 Then only render phase is called
 -Render called(with new data)


*/