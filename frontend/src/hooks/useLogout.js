import { useAuthContext } from "./useAuthContext"


export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    
    const logout = () =>{
        // remove user for storages
        localStorage.removeItem('user')

        ///dispatch
        dispatch({type: 'LOGOUT'})
    }

    return {logout}


}