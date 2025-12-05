import type { IconType } from 'react-icons';
import {
  MdHealthAndSafety,
  MdVaccines,
  MdOutlineWaterDrop,
  MdOutlineLocalHospital,
  MdOutlineContentCut,
  MdOutlinePets,
  MdOutlineRestaurant,
  MdOutlineHome,
} from 'react-icons/md';
import ServiceItem from './ServiceItem';

export type ServiceProps = {
  id: number;
  icon: IconType;
  title: string;
  description: string;
};

const services: ServiceProps[] = [
  {
    id: 1,
    icon: MdHealthAndSafety,
    title: 'Wellness exams',
    description:
      'Annual nose-to-tail check-ups with digital records and reminders.',
  },
  {
    id: 2,
    icon: MdVaccines,
    title: 'Vaccinations',
    description: 'Core and travel vaccines with auto-tracking for every pet.',
  },
  {
    id: 3,
    icon: MdOutlineWaterDrop,
    title: 'Diagnostics lab',
    description: 'Same-day bloodwork and imaging interpreted by on-site vets.',
  },
  {
    id: 4,
    icon: MdOutlineLocalHospital,
    title: 'Soft tissue surgery',
    description: 'Modern surgical suite with dedicated recovery nurse updates.',
  },
  {
    id: 5,
    icon: MdOutlineContentCut,
    title: 'Grooming lounge',
    description:
      'Fear-free grooming, nail care, and coat treatments by specialists.',
  },
  {
    id: 6,
    icon: MdOutlinePets,
    title: 'Dental care',
    description: 'Ultrasonic cleanings, digital dental X-rays, and home plans.',
  },
  {
    id: 7,
    icon: MdOutlineRestaurant,
    title: 'Nutrition coaching',
    description:
      'Tailored diet plans, weight clinics, and prescription food delivery.',
  },
  {
    id: 8,
    icon: MdOutlineHome,
    title: 'Home & taxi visits',
    description:
      'Nurse home visits and pet taxi support for senior companions.',
  },
];

export default function ServiceSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-teal-600 uppercase">
          Our services
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-800">
          Complete care for every stage of life
        </h2>
        <p className="mt-3 text-base text-slate-600">
          From preventive wellness to specialist surgery, one team coordinates
          everything in a single portal.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((serviceItem) => (
          <ServiceItem key={serviceItem.id} serviceItem={serviceItem} />
        ))}
      </div>
    </section>
  );
}
