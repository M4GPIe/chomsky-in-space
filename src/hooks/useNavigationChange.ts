import { useNavigate } from "react-router-dom"

export const useNavigationChange = () => {
    const navigate = useNavigate()

    const handleOnRouteChange = (page : string) => {
        navigate(page);
    }

    return { handleOnRouteChange } 
}