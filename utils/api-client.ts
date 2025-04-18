import axios from 'axios';
import type { DetectionData, DetectionResult, AttackType } from '@/context/detection-context';

// API base URL - will be used for both development and production
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const validateInput = async (inputText: string): Promise<{ valid: boolean; message: string }> => {
  try {
    const response = await apiClient.post('/validate', { input_data: inputText });
    return response.data;
  } catch (error) {
    console.error('Error validating input:', error);
    return { valid: false, message: 'Error connecting to validation service' };
  }
};

export const predictAttacks = async (inputText: string): Promise<DetectionData> => {
  try {
    const response = await apiClient.post('/predict', { input_data: inputText });
    const data = response.data;
    
    // Transform the API response to match our frontend data structure
    return {
      inputText,
      totalPackets: data.totalPackets,
      attacksDetected: data.attacksDetected,
      processingTime: data.processingTime,
      results: data.results as DetectionResult[],
    };
  } catch (error: any) {
    console.error('Error predicting attacks:', error);
    
    // Extract error details from FastAPI response
    if (error.response && error.response.data) {
      const errorDetail = error.response.data.detail;
      
      // Check if the error detail is an object with structured information
      if (typeof errorDetail === 'object' && errorDetail.error) {
        throw {
          message: errorDetail.error,
          formatExample: errorDetail.format_example,
          columns: errorDetail.columns,
          statusCode: error.response.status
        };
      } else {
        // If it's just a string or unexpected format
        throw new Error(typeof errorDetail === 'string' ? errorDetail : 'Failed to process data. Please try again later.');
      }
    }
    
    throw new Error('Failed to process data. Please try again later.');
  }
};

export default apiClient;
