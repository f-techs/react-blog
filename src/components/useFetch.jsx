import {useState, useEffect} from "react";

//custom hook
const useFetch=(url)=>{
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(()=>{
        const abortContr = new AbortController();
        console.log(abortContr.signal);
        setTimeout(()=>{
            fetch(url, {signal: abortContr.signal})
                .then((res)=> {
                    if(!res.ok)
                    {
                        throw new Error("Failed to fetch data")

                    }

                    return res.json()

                })
                .then((result)=>{
                    setData(result)
                    setIsPending(false) // helps use to know the loading of the data
                    setIsError(null)
                })
                .catch((err)=>{
                   if(err.name ==="AbortError"){
                       console.log('Fetch Aborted');
                   }else{
                       setIsPending(true)
                       setIsError(err.message)
                   }

                })

        }, 1000)
        return ()=>{
         abortContr.abort();
        }
        //clean up
    },[url])


    return [data, isPending, isError, ]
}

export default useFetch;