import React, { useEffect, useState } from 'react';
import './verifyEmail.css';
import { Link ,useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { verifyEmail } from '../../redux/ApiCalls/authApiCall';

export default function VerifyEmail() {
 const isEmailVerified = useSelector(state => state.auth.isEmailVerified); // This should be determined by your backend logic
 const dispatch = useDispatch();
 const { userId, token } = useParams();

 useEffect( () => {
  dispatch(verifyEmail(userId, token));
    }, [userId, token]);


    

    return (
        <section className="verify-email">
            {isEmailVerified ? (
                <>
                <i className="fas fa-check-circle verify-email-icon"></i>
                <h2 className='verify-email-title'>Email Verified Successfully!</h2>
                <Link className='verify-email-link' to="/login">Go to Login Page</Link>
                </>
                ) : (
                    <>
                              
                    <h2 className='verify-email-not-found'>Not Found</h2>
            
                    </>
            )}

        </section>
    );
}