import CommentList from "./CommentList.jsx";
import useFetch from "../useFetch.jsx";
import {useEffect, useState} from "react";
import Loader from "../UI/Loader.jsx";


const Comment = () =>{
    const [data, isPending, isError] = useFetch('http://wedding-api.test/api/all-messages')


    return (
        <>
            {isPending && <Loader errorStatus={isError}/>}
            {data && <CommentList weddingMessages={data.data.messages}/>}
        </>
    )
}

export default Comment;