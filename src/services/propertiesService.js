// TODO: Replace with Supabase RPC calls and table queries
// This service will be updated to use Supabase when backend is integrated

const mockProperties = {
  '1': [
    {
      id: 'prop_001',
      address: '12 Smith St, Caboolture QLD',
      propertyCode: 'SMT-001'
    },
    {
      id: 'prop_002', 
      address: '45 Johnson Ave, Brisbane QLD',
      propertyCode: 'JHN-002'
    },
    {
      id: 'prop_003',
      address: '78 Wilson Road, Redcliffe QLD',
      propertyCode: 'WLS-003'
    }
  ],
  'demo_single': [
    {
      id: 'prop_single',
      address: '123 Main Street, Gold Coast QLD',
      propertyCode: 'MN-123'
    }
  ],
  'demo_none': []
};

export const getUserProperties = async (userId) => {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .rpc('get_user_properties', { user_id: userId })
  //   .select('id, address, property_code');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockProperties[userId] || mockProperties['1'];
};

export const getPropertyById = async (propertyId) => {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('properties')
  //   .select('*')
  //   .eq('id', propertyId)
  //   .single();
  
  // Find property in mock data
  const allProperties = Object.values(mockProperties).flat();
  return allProperties.find(prop => prop.id === propertyId);
};