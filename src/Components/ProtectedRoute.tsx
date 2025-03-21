import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { fetchUser } from '../Redux/authUser';
 // adjust the path according to your project

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[]; // Allowed roles for the route
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchUser());
  },[dispatch]);
  const user = useSelector((state: RootState) => state.user); // Assuming user state is set in Redux
  console.log(user);
  const { role } = user;

  if (!role || (role  && !allowedRoles.includes(role))) {
    // Redirect to Forbidden page if the user doesn't have the correct role
    return <Navigate to="/403" />;
  }

  return children;
};

export default ProtectedRoute;
