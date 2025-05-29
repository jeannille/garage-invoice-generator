import { Listing } from './schemas/listing.schema';

/*
Sample truck listing data that is returned and displayed if the API call fails.
Is displayed in the invoice process including PDF preview, download, and email functionality.
*/
export const FALLBACK_LISTING: Listing = {
  "id": "ff71320a-bc4e-4698-af2e-7ff55dcddbde",
  "createdAt": "2025-04-17T12:33:17.347Z",
  "updatedAt": "2025-04-17T12:33:17.400Z",
  "listingTitle": "2005 E-One Pumper",
  "sellingPrice": 50000,
  "estimatedPriceMin": null,
  "estimatedPriceMax": null,
  "imageUrls": [
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892184400-amo6lq7.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892189742-xjm14op.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892192710-qs9i7fo.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892197104-e648nkk.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892202264-enp0ov0.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892205899-n4y2999.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892209295-xz3va7k.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892214834-eluqmpm.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892221748-vpb3959.jpg",
    "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/items/c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83/1744892804350-5tznflv.PNG"
  ],
  "listingStatus": 0,
  "tags": [],
  "categories": [1, 1001],
  "itemBrand": "E-One",
  "listingDescription": "750 Gal Water Tank\nCummins ISL\nHale QFLO 1250GPM\n",
  "itemAge": 2005,
  "itemLength": 392,
  "itemWidth": 96,
  "itemHeight": 117,
  "itemWeight": 35000,
  "mileage": null,
  "hasServiceRecords": false,
  "hasRust": false,
  "isFourWheelDrive": null,
  "tankSize": 750,
  "pumpSize": 1250,
  "hasPumpTest": false,
  "aerialLength": null,
  "isAuction": false,
  "expirationDate": null,
  "finalPrice": null,
  "originalPrice": 50000,
  "lowestPrice": 40000,
  "isAdaptivePricing": true,
  "vin": null,
  "categoryV2Id": "fa257783-f061-4187-9eac-110ffe1f7c13",
  "userId": "c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83",
  "addressId": "8fa9e1eb-a3c5-4a9a-95cb-13bcd34c1a1b",
  "user": {
    "id": "c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83",
    "email": "ds906262@gmail.com"
  },
  "categoryV2": {
    "id": "fa257783-f061-4187-9eac-110ffe1f7c13",
    "createdAt": "2025-04-15T22:59:21.911Z",
    "updatedAt": "2025-04-18T14:56:35.096Z",
    "name": "Engines and pumpers",
    "description": "Discover available used fire engines and pumpers across the United States. Nationwide delivery available on all listings.",
    "imageUrl": "https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/categories//engines-and-pumpers.jpg",
    "slug": "used-engines-and-pumpers",
    "parentCategoryId": "b21ad398-fd0c-4c41-bab6-8d2a0852e953"
  }
}; 