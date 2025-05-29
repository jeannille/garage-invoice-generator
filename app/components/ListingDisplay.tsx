"use client";

import { useState } from "react";
import { listingService } from "../services/listingService";
import { Listing } from "@/lib/schemas/listing.schema";
import { InvoicePDF, InvoiceEmailForm } from "./InvoicePDF";
import { FileText, X, Info, AlertTriangle } from "lucide-react";
import { PDFViewer } from "@react-pdf/renderer";

export default function ListingDisplay() {
  const [input, setInput] = useState("");
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchListingAndShowPDF = async () => {
    if (!input) {
      setError("Please enter a listing ID or URL");
      return;
    }

    setLoading(true);
    setError("");
    setUsingFallback(false);

    let listingId: string;

    // Determine if input is a URL or ID
    if (input.includes("withgarage.com/listing/")) {
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
      
      // Check if we're using fallback data
      if (response.usingFallback) {
        setUsingFallback(true);
        setError("Server temporarily unavailable. Showing demo data for testing purposes.");
      }
    } catch (err) {
      // This shouldn't happen anymore since we handle fallback in the service
      setError(err instanceof Error ? err.message : "Failed to fetch listing");
      setListing(null);
    } finally {
      setLoading(false);
    }
  };

  // Simple component to confirm the listing is being fetched
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <h1 className="text-2xl font-bold">Search for a listing</h1>

      <div className="flex gap-4 flex-col">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter listing ID or URL"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={fetchListingAndShowPDF}
          disabled={loading}
          className="w-auto px-4 py-3 border-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-base whitespace-nowrap disabled:bg-gray-400 disabled:border-gray-400 transition-colors duration-200 ml-auto flex items-center"
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <FileText className="h-5 w-5 mr-2" />
              Request PDF Invoice
            </>
          )}
        </button>
      </div>

      {/* Fallback warning */}
      {usingFallback && (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded border border-yellow-300 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Invoice Preview Mode</p>
            <p className="text-sm">The server is temporarily unavailable. Preview the complete invoice process using sample data, including PDF preview, download, and email delivery below.</p>
          </div>
        </div>
      )}

      {/* regular error (for URL validation etc.) */}
      {error && !usingFallback && (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {listing && (
        <div className="border border-gray-200 rounded p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">{listing.listingTitle}</h2>

            {/* PDF Viewer Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">PDF Invoice</h3>
              {/* <InvoicePDF listing={listing} /> */}
              <PDFViewer width="100%" height="600">
                <InvoicePDF listing={listing} />
              </PDFViewer>
            </div>

            {/* Email Form Section */}
            <InvoiceEmailForm listing={listing} />

            {/* Listing Details Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
              
                <button
                  onClick={() => setDetailsExpanded(!detailsExpanded)}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  {detailsExpanded ? (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <Info className="h-4 w-4 mr-1" />
                      Show All Details
                    </>
                  )}
                </button>
              </div>

              {detailsExpanded && (
                <>
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold"> Full Listing Details</h3>
                </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-base font-semibold mb-2">
                        Specifications
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <span className="font-medium">ID:</span> {listing.id}
                        </li>
                        <li>
                          <span className="font-medium">Brand:</span>{" "}
                          {listing.itemBrand}
                        </li>
                        <li>
                          <span className="font-medium">Year:</span>{" "}
                          {listing.itemAge}
                        </li>
                        <li>
                          <span className="font-medium">Price:</span> $
                          {listing.sellingPrice.toLocaleString()}
                        </li>
                        {listing.itemLength &&
                        listing.itemWidth &&
                        listing.itemHeight ? (
                          <li>
                            <span className="font-medium">Dimensions:</span>{" "}
                            {listing.itemLength}" × {listing.itemWidth}" ×{" "}
                            {listing.itemHeight}"
                          </li>
                        ) : null}
                        {listing.itemWeight && (
                          <li>
                            <span className="font-medium">Weight:</span>{" "}
                            {listing.itemWeight} lbs
                          </li>
                        )}
                        {listing.tankSize && (
                          <li>
                            <span className="font-medium">Tank Size:</span>{" "}
                            {listing.tankSize} gal
                          </li>
                        )}
                        {listing.pumpSize && (
                          <li>
                            <span className="font-medium">Pump Size:</span>{" "}
                            {listing.pumpSize} GPM
                          </li>
                        )}
                        {listing.aerialLength && (
                          <li>
                            <span className="font-medium">Aerial Length:</span>{" "}
                            {listing.aerialLength} ft
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold mb-2">Seller</h4>
                      <p>
                        <span className="font-medium">User ID:</span>{" "}
                        {listing.userId}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {listing.user.email}
                      </p>

                      <h4 className="text-base font-semibold mt-4 mb-2">
                        Category
                      </h4>
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {listing.categoryV2.name}
                      </p>
                      <p>
                        <span className="font-medium">Slug:</span>{" "}
                        {listing.categoryV2.slug}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold mb-2">Description</h4>
                    <p className="whitespace-pre-line">
                      {listing.listingDescription}
                    </p>
                  </div>

                  {listing.imageUrls.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-base font-semibold mb-2">Images</h4>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
