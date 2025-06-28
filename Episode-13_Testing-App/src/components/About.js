
import User from "./User";
import React from "react";
import UserContext from "../utils/UserContext";
class About extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <UserContext.Consumer>
                    {
                        ({ loggedInUser }) => (<h1 className="text-xl font-bold">LoggedIn User: {loggedInUser}</h1>)
                    }
                </UserContext.Consumer>
                <h2 className="font-bold text-slate-700 m-4">ABOUT US</h2>
                <User />
            </div>
        )
    }//render
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