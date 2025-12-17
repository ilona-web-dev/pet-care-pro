import Testimonial from '../shared/Testimonial';

import seamusReview from '../../assets/testimonials/testimonial1.jpg';
import kenjiReview from '../../assets/testimonials/testimonial2.jpg';
import harishReview from '../../assets/testimonials/testimonial3.jpg';
import niamhReview from '../../assets/testimonials/testimonial4.jpg';

export type TestimonialsProps = {
  id: number;
  ownerName: string;
  petName: string;
  petAge: string;
  petBreed: string;
  photo: string;
  review: string;
  location: string;
};

const testimonials: TestimonialsProps[] = [
  {
    id: 1,
    ownerName: 'Seamus O’Riley',
    petName: 'Finn',
    petAge: '10 years',
    petBreed: 'Dachshund',
    photo: seamusReview,
    location: 'Clontarf, Dublin 3',
    review:
      'Finn has a long list of meds, yet every script and lab is already logged in their portal. When he needed fluids last month, I could check the nurse updates from home.',
  },
  {
    id: 2,
    ownerName: 'Kenji Tanaka',
    petName: 'Mochi',
    petAge: '4 years',
    petBreed: 'Tabby Cat',
    photo: kenjiReview,
    location: 'Ranelagh, Dublin 6',
    review:
      'We split time between Dublin and Galway. PetCare Pro keeps Mochi’s vaccines, allergy notes, and bloodwork synced so any vet in the network already knows her history.',
  },
  {
    id: 3,
    ownerName: 'Harish Patel',
    petName: 'Max',
    petAge: '3 years',
    petBreed: 'Pembroke Welsh Corgi',
    photo: harishReview,
    location: 'Sandyford, Dublin 18',
    review:
      'Max tore his paw on a hike — I booked in seconds through the portal and watched the visit log update as the vet cleaned and wrapped it. His discharge plan hit my inbox before I parked.',
  },
  {
    id: 4,
    ownerName: 'Niamh Kelleher',
    petName: 'Oscar',
    petAge: '6 years',
    petBreed: 'British Shorthair',
    photo: niamhReview,
    location: 'Portobello, Dublin 8',
    review:
      'Oscar is shy and hates travel, so having video consults plus the pet taxi has been a lifesaver. Every visit summary lands in my inbox with next steps and refill reminders.',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-teal-600 uppercase">
          Kind words from pet parents
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-800">
          Why Dublin families trust PetCare Pro
        </h2>
        <p className="mt-3 text-base text-slate-600">
          From emergency surgeries to senior care, our team shares live updates
          so you always know how your pet is doing.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
