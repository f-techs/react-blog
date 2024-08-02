import {useState, useEffect} from "react";

//custom hook
const useFetch=(url)=>{
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
            fetch(url)
                .then((res)=> {
                    if(!res.ok)
                    {
                        throw new Error("Failed to fetch data")
                    }
                    return res.json()
                })
                .then((data)=>{
                    setData(data)
                    setIsPending(false) // helps use to know the loading of the data
                    setIsError(null)
                })
                .catch((err)=>{
                    setIsError(err.message)
                    console.log(err.message)
                    console.log(isError)
                })
        }, 2000)

    },[])


    return [data, isPending, isError]
}

export default useFetch;