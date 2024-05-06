import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useSignpup = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})

        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
          }
        if(response.ok){
            //save the user to localstorages
            localStorage.setItem('user', JSON.stringify(json))

            //update auth
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return { signup, isLoading, error}
}
