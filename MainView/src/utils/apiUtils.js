/**
 * Utility functions for API operations
 */

/**
 * Create cache key for localStorage
 * @param {string} prefix - Cache key prefix
 * @param {string} town - Town name
 * @param {string} country - Country name
 * @returns {string} Cache key
 */
export const createCacheKey = (prefix, town, country) => {
  return `${prefix}_${town}_${country}`;
};

/**
 * Get cached data from localStorage
 * @param {string} cacheKey - Cache key
 * @returns {Object|null} Cached data or null if not found
 */
export const getCachedData = (cacheKey) => {
  try {
    const cachedData = localStorage.getItem(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Error parsing cached data:', error);
    return null;
  }
};

/**
 * Set cached data in localStorage
 * @param {string} cacheKey - Cache key
 * @param {Object} data - Data to cache
 */
export const setCachedData = (cacheKey, data) => {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching data:', error);
  }
};

/**
 * Create API request configuration
 * @param {string} method - HTTP method
 * @param {Object} body - Request body
 * @returns {Object} Fetch configuration object
 */
export const createApiConfig = (method = 'GET', body = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  return config;
};

/**
 * Handle API response
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} Parsed response data
 * @throws {Error} If response is not ok
 */
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }
  
  return await response.json();
};

