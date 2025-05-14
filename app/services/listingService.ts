import { ListingResponse, ListingResponseSchema } from "@/lib/schemas/listing.schema";

const API_BASE_URL = "https://garage-backend.onrender.com";

/**
 * Fetches a listing by ID
 * @param id - UUID of the listing to fetch
 * @returns A parsed listing response
 */
export async function getListing(id: string): Promise<ListingResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/getListing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch listing: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate the response with Zod
    const validatedData = ListingResponseSchema.parse(data);
    return validatedData;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
} 