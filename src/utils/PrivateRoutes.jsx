import { Outlet, Navigate} from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'


const PrivateRoutes = () => {
    let { admin } = useAuthContext();
    return(
        !admin ? <Navigate to={'/login'} /> : <Outlet/>
    )
}

export default PrivateRoutes;