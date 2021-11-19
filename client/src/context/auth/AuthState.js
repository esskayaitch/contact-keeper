import React, { useReducer } from 'react';
import Axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  /*******************************************
   * Load user
   */
  const loadUser = async () => {
    // load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    //
    try {
      const res = await Axios.get('/api/auth');

      // console.log(res);

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  /*******************************************
   * Register user
   */
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await Axios.post('/api/users', formData, config); // note path

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // this is the returned token jwt
      });
      // and call Load User
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg // this is the returned error msg
      });
    }
  };

  /*******************************************
   * Login user
   */
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await Axios.post('/api/auth', formData, config); // note path

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data // this is the returned token jwt
      });
      // and call Load User
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg // this is the returned error msg
      });
    }
  };

  /*******************************************
   * Logout user
   */
  const logout = () => dispatch({ type: LOGOUT });

  /*******************************************
   * Clear errors
   */
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  /**
   * return
   */
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );

  //
}; //
//
export default AuthState;
