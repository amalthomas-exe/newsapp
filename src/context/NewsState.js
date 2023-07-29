import newsContext from "./newsContext";
import { useState } from "react";

const NewsState = (props) => {
    const host = "https://newsapi.org/v2";
    const apiKey = "fb5b39b60c544a7ebc372594074ab4b0";
    const categories = {
        "trending": "top-headlines",
        "business": "everything?q=business",
        "entertainment": "everything?q=entertainment",
        "health": "everything?q=health",
        "science": "everything?q=science",
        "sports": "everything?q=sports",
        "technology": "everything?q=technology",
    }

    const [news,setNews] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    const [dataNeeded, setDataNeeded] = useState(false);
    const [category, setCategory] = useState("trending");

    const fetchData = async () => {
        console.log("fetching data")
        const response = await fetch(`${host}/${categories[category]}${category=="trending"?"?country=in":""}&apiKey=${apiKey}`);
        console.log(response)
        const json = await response.json();
        console.log(json.totalResults + " total results")
        setNews(json.articles)
        setDataReady(true)
    }
    

    return (
        <newsContext.Provider value={{
            news:news,
            dataReady:dataReady,
            fetchData:fetchData,
            category:category,
            setCategory:setCategory,
        }}>
            {props.children}
        </newsContext.Provider>
    )
}

export default NewsState