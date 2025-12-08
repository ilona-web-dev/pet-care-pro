import { MdFormatQuote } from 'react-icons/md';
import { type TestimonialsProps } from './sections/TestimonialsSection';

type TestimonialProps = {
  testimonial: TestimonialsProps;
};

export default function Testimonial({
  testimonial: {
    ownerName,
    petName,
    petAge,
    petBreed,
    photo,
    location,
    review,
  },
}: TestimonialProps) {
  return (
    <article className="relative flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
      <MdFormatQuote aria-hidden="true" className="text-4xl text-teal-500" />
      <p className="text-base text-slate-700">{review}</p>
      <div className="mt-auto flex items-center gap-4">
        <img
          src={photo}
          alt={`${ownerName} with ${petName}`}
          className="h-24 w-24 rounded-full object-cover object-top"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold text-slate-800">{ownerName}</p>
          <p className="text-xs text-slate-500">
            {petName}, {petAge} • {petBreed}
          </p>
          <p className="text-xs text-slate-400">{location}</p>
        </div>
      </div>
    </article>
  );
}
