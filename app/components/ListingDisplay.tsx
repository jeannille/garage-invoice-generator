"use client";

import { useState } from "react";
import { listingService } from "../services/listingService";
import { Listing } from "@/lib/schemas/listing.schema";

export default function ListingDisplay() {
  const [input, setInput] = useState("");
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchListing = async () => {
    if (!input) {
      setError("Please enter a listing ID or URL");
      return;
    }

    setLoading(true);
    setError("");
    
    let listingId: string;
    
    // Determine if input is a URL or ID
    if (input.includes('withgarage.com/listing/')) {
      try {
        listingId = listingService.extractListingIdFromUrl(input);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid listing URL");
        setListing(null);
        setLoading(false);
        return;
      }
    } else {
      // Assume input is already an ID
      listingId = input;
    }

    try {
      const response = await listingService.getListing(listingId);
      setListing(response.result.listing);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch listing");
      setListing(null);
    } finally {
      setLoading(false);
    }
  };

  // Simple component to confirm the listing is being fetched
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <h1 className="text-2xl font-bold">Listing Search</h1>
      
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter listing ID or URL"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={fetchListing}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Fetch Listing"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {listing && (
        <div className="border border-gray-200 rounded p-6">
          <h2 className="text-xl font-bold mb-4">{listing.listingTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">ID:</span> {listing.id}</li>
                <li><span className="font-medium">Brand:</span> {listing.itemBrand}</li>
                <li><span className="font-medium">Year:</span> {listing.itemAge}</li>
                <li><span className="font-medium">Price:</span> ${listing.sellingPrice.toLocaleString()}</li>
                {(listing.itemLength && listing.itemWidth && listing.itemHeight) ? (
                  <li><span className="font-medium">Dimensions:</span> {listing.itemLength}" × {listing.itemWidth}" × {listing.itemHeight}"</li>
                ) : null}
                {listing.itemWeight && <li><span className="font-medium">Weight:</span> {listing.itemWeight} lbs</li>}
                {listing.tankSize && <li><span className="font-medium">Tank Size:</span> {listing.tankSize} gal</li>}
                {listing.pumpSize && <li><span className="font-medium">Pump Size:</span> {listing.pumpSize} GPM</li>}
                {listing.aerialLength && <li><span className="font-medium">Aerial Length:</span> {listing.aerialLength} ft</li>}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Seller</h3>
              <p><span className="font-medium">User ID:</span> {listing.userId}</p>
              <p><span className="font-medium">Email:</span> {listing.user.email}</p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Category</h3>
              <p><span className="font-medium">Name:</span> {listing.categoryV2.name}</p>
              <p><span className="font-medium">Slug:</span> {listing.categoryV2.slug}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-line">{listing.listingDescription}</p>
          </div>
          
          {listing.imageUrls.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {listing.imageUrls.map((url, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <img 
                      src={url} 
                      alt={`${listing.listingTitle} image ${index + 1}`} 
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 