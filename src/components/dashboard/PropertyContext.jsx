import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../services/propertiesService';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const propertyId = searchParams.get('propertyId');

  useEffect(() => {
    loadProperty();
  }, [propertyId]);

  const loadProperty = async () => {
    if (!propertyId) {
      // No property selected, redirect to properties page
      navigate('/properties');
      return;
    }

    try {
      setLoading(true);
      const property = await getPropertyById(propertyId);
      
      if (!property) {
        // Property not found, redirect to properties page
        navigate('/properties');
        return;
      }
      
      setSelectedProperty(property);
    } catch (error) {
      console.error('Error loading property:', error);
      navigate('/properties');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    selectedProperty,
    propertyId,
    loading
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};