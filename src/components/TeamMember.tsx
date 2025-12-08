import { type TeamProps } from './sections/TeamSection';

type TeamMemberProps = {
  teamMember: TeamProps;
};

export default function TeamMember({
  teamMember: { photo, name, role, experience, bio },
}: TeamMemberProps) {
  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="relative">
        <img
          src={photo}
          alt={name}
          className="h-56 w-full rounded-2xl object-cover object-top"
          loading="lazy"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
          {experience} experience
        </span>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="text-lg font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-teal-600">{role}</p>
        <p className="mt-3 text-sm text-slate-600">{bio}</p>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
      >
        Book with {name.split(' ')[1]}
      </button>
    </article>
  );
}
