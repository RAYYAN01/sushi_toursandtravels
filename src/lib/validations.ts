import { z } from 'zod';

// Step 1: Trip Details Validation
export const tripDetailsSchema = z.object({
  pickupLocation: z.string().min(3, 'Pickup location must be at least 3 characters'),
  dropLocation: z.string().min(3, 'Drop location must be at least 3 characters'),
  tripType: z.enum(['One Way', 'Round Trip', 'Local Package'], {
    message: 'Please select a valid trip type',
  }),
  date: z.string().min(1, 'Please select a pickup date'),
  time: z.string().min(1, 'Please select a pickup time'),
  returnDate: z.string().optional(),
  vehicleType: z.string().min(1, 'Please select a vehicle category'),
});

// Step 2: Passenger Details Validation
export const passengerDetailsSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  passengers: z.number({ message: 'Please enter a valid number' }).min(1, 'At least 1 passenger is required').max(50, 'Max 50 passengers allowed'),
  specialRequests: z.string().optional(),
});

// Combined Booking Schema
export const bookingSchema = tripDetailsSchema.merge(passengerDetailsSchema);

// Contact Form Validation Schema
export const contactSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type TripDetails = z.infer<typeof tripDetailsSchema>;
export type PassengerDetails = z.infer<typeof passengerDetailsSchema>;
export type BookingData = z.infer<typeof bookingSchema>;
export type ContactData = z.infer<typeof contactSchema>;
