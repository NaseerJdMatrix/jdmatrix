import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router';

function Index({ Component }) {
  const navigate = useNavigate();
  
  useEffect(() => {
      const isLogin = localStorage.getItem('isLogin');
      if(!(isLogin==='true')){
        console.log('User not authenticated. Redirecting to signin page.');
        navigate('/signin');
      }
    }, []);


  return (
    <Component />
  );
}

Index.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default Index;
