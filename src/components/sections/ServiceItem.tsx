import { type ServiceProps } from './ServiceSection';

type ServiceItemProps = {
  serviceItem: ServiceProps;
};

export default function ServiceItem({
  serviceItem: { title, description, icon: Icon },
}: ServiceItemProps) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
        <Icon aria-hidden="true" className="text-2xl" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </article>
  );
}
