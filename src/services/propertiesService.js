// src/services/propertiesService.js
import { supabase } from '../lib/supabaseClient';

/** One-call RPC using auth.uid() on the server */
export const getUserProperties = async () => {
  const { data, error } = await supabase.rpc('get_user_properties');
  if (error) throw error;
  return data ?? [];
};

export const getPropertyById = async (propertyId) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', propertyId)
    .single();

  if (error) {
    if (error.code === 'PGRST116' || (error.details ?? '').includes('0 rows')) return null;
    throw error;
  }
  return data;
};
