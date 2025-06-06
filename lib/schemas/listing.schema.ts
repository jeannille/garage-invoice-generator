import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email()
});

export const CategoryV2Schema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  slug: z.string(),
  parentCategoryId: z.string().uuid()
});

export const ListingSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  listingTitle: z.string(),
  sellingPrice: z.number(),
  estimatedPriceMin: z.number().nullable(),
  estimatedPriceMax: z.number().nullable(),
  imageUrls: z.array(z.string().url()),
  listingStatus: z.number(),
  tags: z.array(z.unknown()),
  categories: z.array(z.number()),
  itemBrand: z.string(),
  listingDescription: z.string(),
  itemAge: z.number(),
  itemLength: z.number().nullable(),
  itemWidth: z.number().nullable(),
  itemHeight: z.number().nullable(),
  itemWeight: z.number().nullable(),
  mileage: z.number().nullable(),
  hasServiceRecords: z.boolean().nullable(),
  hasRust: z.boolean().nullable(),
  isFourWheelDrive: z.boolean().nullable(),
  tankSize: z.number().nullable(),
  pumpSize: z.number().nullable(),
  hasPumpTest: z.boolean().nullable(),
  aerialLength: z.number().nullable(),
  isAuction: z.boolean().nullable(),
  expirationDate: z.string().datetime().nullable(),
  finalPrice: z.number().nullable(),
  originalPrice: z.number().nullable(),
  lowestPrice: z.number().nullable(),
  isAdaptivePricing: z.boolean(),
  vin: z.string().nullable(),
  categoryV2Id: z.string().uuid(),
  userId: z.string().uuid(),
  addressId: z.string().uuid(),
  user: UserSchema,
  categoryV2: CategoryV2Schema
});

export const ListingResponseSchema = z.object({
  result: z.object({
    listing: ListingSchema
  }),
  error: z.string()
});

export const EmailInvoiceRequestSchema = z.object({
  listing: ListingSchema,
  userEmail: z.string().email(),
  pdfBase64: z.string()
});

export type User = z.infer<typeof UserSchema>;
export type CategoryV2 = z.infer<typeof CategoryV2Schema>;
export type Listing = z.infer<typeof ListingSchema>;
export type ListingResponse = z.infer<typeof ListingResponseSchema>;
export type EmailInvoiceRequest = z.infer<typeof EmailInvoiceRequestSchema>; 