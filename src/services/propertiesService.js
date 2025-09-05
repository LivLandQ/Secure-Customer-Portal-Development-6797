// src/services/propertiesService.js
import { supabase } from '../lib/supabaseClient';

/**
 * Tables (Model A):
 *  - public.properties (id uuid PK, address text, property_code text, created_at timestamptz)
 *  - public.property_access (user_id uuid FK -> auth.users.id, property_id uuid FK -> properties.id)
 * RLS ensures users only see properties they have access to.
 */

/** Get all properties visible to the user */
export const getUserProperties = async (userId) => {
  // Step 1: get property ids the user can access
  const { data: links, error: linkErr } = await supabase
    .from('property_access')
    .select('property_id')
    .eq('user_id', userId);

  if (linkErr) throw linkErr;
  if (!links || links.length === 0) return [];

  const ids = links.map(l => l.property_id);

  // Step 2: fetch those properties
  const { data, error } = await supabase
    .from('properties')
    .select('id, address, property_code')
    .in('id', ids)
    .order('address', { ascending: true });

  if (error) throw error;
  return data ?? [];
};

/** Get one property by id (RLS must allow it via property_access) */
export const getPropertyById = async (propertyId) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', propertyId)
    .single();

  if (error) {
    // If 0 rows due to RLS or not found, return null
    if (error.code === 'PGRST116' || (error.details ?? '').includes('0 rows')) return null;
    throw error;
  }
  return data;
};
