import { useState, useEffect } from "react";
//Method parameter added to allow set and post
export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [ispending, setPending] = useState(false);
  const [error, setError] = useState(null);

  //options state
  const [options, setOptions] = useState(null);

  //post data
  const postData = (postData) => {
    //options parameters
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Turns JavaScript into JSON data to be posted to server
      body: JSON.stringify(postData),
    });
  };

  //for onjects and functions being passed through, either wrap in a useState or UseRef().current
  useEffect(() => {
    //fails if state is being updated simulationsly
    const controller = new AbortController();

    //async function for retrieving the data
    const fetchData = async (fetchOptions) => {
      setPending(true);
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setPending(false);
        setData(json);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted ");
        } else {
          setPending(false);
          setError("An Error has occured");
        }
      }
    };
    if (method === "GET"){
        fetchData();
    }
    if(method === "POST" && options){
        fetchData(options)
    }
    return () => {
      controller.abort();
    };
  }, [url, options, method]);
  return { data, ispending, error, postData };
};
