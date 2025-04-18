import apiClient from './api-client';

export async function getSampleData(): Promise<string> {
  try {
    const response = await apiClient.get('/sample');
    return response.data.sample_data;
  } catch (error) {
    console.error('Error getting sample data:', error);
    // Fallback to a static example if API fails
    return "0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal";
  }
} 