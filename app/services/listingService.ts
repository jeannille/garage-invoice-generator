import { ListingResponse, ListingResponseSchema } from "@/lib/schemas/listing.schema";
import { FALLBACK_LISTING } from "@/lib/fallback-data";
import { z } from "zod";
/*
Service for handling listing details and API calls.
Used to fetch a listing by ID or URL and return listing data.
Has fallback data for when the API call fails.
*/

const API_BASE_URL = "https://garage-backend.onrender.com";

// Schema for URL validation
const GarageUrlSchema = z.string().url().includes('withgarage.com/listing/');

// UUID v5 regex pattern
const UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Service for handling listing-related API calls
 */
export const listingService = {
  /**
   * Fetches a listing by ID
   * @param id - UUID of the listing to fetch
   * @returns listing json response from getListing API or fallback data if API fails
   */
  async getListing(id: string): Promise<ListingResponse & { usingFallback?: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/getListing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        console.warn(`API request failed with status ${response.status}: ${response.statusText}. Using fallback data.`);
        return {
          result: { listing: FALLBACK_LISTING },
          error: "",
          usingFallback: true
        };
      }

      const data = await response.json();
      
      // Validate the response with Zod
      const validatedData = ListingResponseSchema.parse(data);
      return validatedData;
    } catch (error) {
      console.warn("Error fetching listing, using fallback data:", error);
      return {
        result: { listing: FALLBACK_LISTING },
        error: "",
        usingFallback: true
      };
    }
  },

  /**
   * Extracts listing from Garage listing URL
   * @param url - Full Garage listing URL (format: https://www.withgarage.com/listing/[title]-[uuid])
   * @returns extracted listing ID (UUID)
   */
  extractListingIdFromUrl(url: string): string {
    // validate URL
    try {
      GarageUrlSchema.parse(url);
    } catch (error) {
      throw new Error('Invalid Garage listing URL format');
    }
    
    // Extract the UUID using regex
    const match = url.match(UUID_PATTERN);
    
    if (!match || !match[0]) {
      throw new Error('Could not find a valid UUID in the URL');
    }   
    return match[0];
  }
}; 

