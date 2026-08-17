import React from 'react';
import { Vehicle, getMinimumDailyTotal, MIN_KM_PER_DAY, STANDARD_DUTY_HOURS } from '@/lib/vehicles';

/**
 * Real pricing breakdown block for a vehicle landing page. Reuses
 * getMinimumDailyTotal() from lib/vehicles.ts (the single source of truth
 * for the computed minimum daily charge) instead of hardcoding a total —
 * for "Price on Request" vehicles that helper returns null and this
 * component shows the request-a-quote note instead of a fabricated figure.
 */
export default function VehiclePricingTable({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-5">
      <h2 className="font-serif font-bold text-xl text-navy">Pricing &amp; Rental Terms</h2>
      <div className="space-y-4">
        {vehicles.map((vehicle) => {
          const total = getMinimumDailyTotal(vehicle);
          return (
            <div key={vehicle.id} className="rounded-xl border border-navy-light/10 bg-cream/60 p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-serif font-bold text-navy text-base">{vehicle.name}</h3>
                {vehicle.priceDisplay ? (
                  <span className="text-sm font-bold text-primary-dark">{vehicle.priceDisplay}</span>
                ) : (
                  <span className="text-sm font-bold text-navy">₹{vehicle.ratePerKm}/km</span>
                )}
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-navy">
                <li>
                  <span className="block text-navy-light text-[10px] uppercase font-bold tracking-wider">Minimum</span>
                  {vehicle.minKmPerDay ?? MIN_KM_PER_DAY} km/day
                </li>
                <li>
                  <span className="block text-navy-light text-[10px] uppercase font-bold tracking-wider">Driver Bata</span>
                  {vehicle.driverBata ? `₹${vehicle.driverBata}/day` : 'On request'}
                </li>
                <li>
                  <span className="block text-navy-light text-[10px] uppercase font-bold tracking-wider">Duty Hours</span>
                  {vehicle.drivingHours ?? STANDARD_DUTY_HOURS}
                </li>
                <li>
                  <span className="block text-navy-light text-[10px] uppercase font-bold tracking-wider">Toll / Permits</span>
                  Additional
                </li>
              </ul>
              {total !== null ? (
                <div className="mt-3 text-center font-bold text-navy bg-white rounded-lg py-2 text-sm">
                  Est. minimum daily charge: ₹{total.toLocaleString('en-IN')}*
                </div>
              ) : (
                <div className="mt-3 text-center text-xs text-primary-dark font-medium bg-white rounded-lg py-2">
                  Price on request — call or WhatsApp for a custom quote
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-navy-light leading-relaxed">
        *Estimated minimum daily charge = rate/km × minimum km/day + driver bata, calculated per vehicle above. Extra driver
        bata applies for driving after 10:00 PM. Toll, parking, permit and state taxes are additional and not included in
        the rate. Final fare may vary by route, trip duration, and applicable charges.
      </p>
    </section>
  );
}
