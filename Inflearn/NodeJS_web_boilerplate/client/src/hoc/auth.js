import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null){
    /*
        option
            - null => Anyone 
            - true => Only user
            - false => Not only user
    */
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function AuthenticationCheck (props){
        useEffect(() => {
        
          dispatch(authUser()).then(response => {
            if(!response.payload.isAuth){
                if(option){
                    navigate('/login');
                }
            } else{
                if(adminRoute && !response.payload.isAdmin){
                    navigate('/login');
                } else{
                    if(option === false)
                        navigate('/login');
                }
            }
          });
        }, [])
        
        return (
            <SpecificComponent/>
        )
    }



    return AuthenticationCheck;
}

