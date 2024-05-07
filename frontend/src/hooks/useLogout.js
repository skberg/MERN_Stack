import { useAuthContext } from "./useAuthContext"

import { useWorkoutsContext } from "./useWorkoutsContext"
export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch: workouts} = useWorkoutsContext()
    
    const logout = () =>{
        // remove user for storages
        localStorage.removeItem('user')

        ///dispatch
        dispatch({type: 'LOGOUT'})
        workouts({type:'SET_WORKOUTS', payload: null})
    }

    return {logout}


}