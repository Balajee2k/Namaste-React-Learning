import { useRouteError } from "react-router-dom";

const Error=()=>{
    const error=useRouteError();
    console.log(error);
    return(
        <div className="error">
            <h1>{error.data}</h1>
        </div>
    )
}
export default Error;