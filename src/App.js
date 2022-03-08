import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
    console.log("env", process.env.REACT_APP_PROD_API_BASE_URL);
    const [blogs, setBlogs] = useState("");

    useEffect(() => {
        console.log("fetching");
        fetch(`${process.env.REACT_APP_PROD_API_BASE_URL}/api/blog`)
            .then((response) => console.log("response", response))
            .then(
                (data) => console.log(data)
                // setBlogs(res.data)
            );
    }, []);

    return (
        <div className="App">
            <h4>Article de blog</h4>
            <dl>
                {blogs &&
                    blogs.map((blog) => {
                        return (
                            <>
                                <dd>{blog.titre}</dd>
                                <dd>{blog.description}</dd>
                                <hr></hr>
                            </>
                        );
                    })}
            </dl>
        </div>
    );
}

export default App;
