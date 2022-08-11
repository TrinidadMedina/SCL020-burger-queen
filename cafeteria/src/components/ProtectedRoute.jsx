import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    let navigate = useNavigate()
  const { user } = UserAuth();

  if (!user) {
    navigate("/")
  }
  return children;
};
