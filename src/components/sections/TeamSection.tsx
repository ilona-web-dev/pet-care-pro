import TeamMember from '../../components/shared/TeamMember';
import aoifeVetDoc from '../../assets/team/aoife-gallagher.jpg';
import maireVetDoc from '../../assets/team/maire-osullivan.jpg';
import cianVetDoc from '../../assets/team/cian-mcdonnell.jpg';
import saoirseGroomer from '../../assets/team/saoirse-byrne.jpg';

export type TeamProps = {
  id: number;
  name: string;
  role: string;
  experience: string;
  bio: string;
  photo: string;
};

const team: TeamProps[] = [
  {
    id: 1,
    name: 'Dr. Máire O’Sullivan',
    role: 'Senior Veterinary Surgeon & Internal Medicine Lead',
    experience: '28 years',
    photo: maireVetDoc,
    bio: 'Máire has been caring for pets for nearly three decades and leads our internal medicine department. She is dedicated to complex case management, senior pet care and mentoring younger vets. Her experience and steady, reassuring manner make her highly trusted by long-term clients.',
  },
  {
    id: 2,
    name: 'Dr. Cian McDonnell',
    role: 'Veterinary Surgeon - Surgery & Orthopedics',
    experience: '15 years',
    photo: cianVetDoc,
    bio: 'Cian specialises in soft-tissue and orthopedic surgery, with a strong focus on mobility restoration and post-operative recovery. He brings a precise, detail-oriented approach to every procedure and enjoys working with active dogs who need tailored rehabilitation plans.',
  },
  {
    id: 3,
    name: 'Dr. Aoife Gallagher',
    role: 'Veterinary Nurse',
    experience: '6 years',
    photo: aoifeVetDoc,
    bio: 'Aoife is an experienced veterinary nurse specialising in small animal care and patient handling. Her calm, reassuring approach helps even anxious pets feel safe. She supports preventive care, assists during diagnostics, and contributes to long-term wellness plans. Her key interests include dermatology, nutrition, and supporting complex medical cases.',
  },
  {
    id: 4,
    name: 'Saoirse Byrne',
    role: 'Professional Pet Groomer',
    experience: '4 years',
    photo: saoirseGroomer,
    bio: 'Saoirse provides gentle, breed-appropriate grooming with an emphasis on comfort and positive handling. She has experience working with anxious pets and always takes the time to help them relax. Her favourite part of the job is seeing pets leave looking fresh and feeling confident.',
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-6xl px-4">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-teal-600 uppercase">
          Meet the team
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-800">
          Dublin vets, nurses, and groomers who know your pet
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Every visit includes real-time updates from your dedicated nurse and
          direct messaging with the vet.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {team.map((teamMember) => (
          <TeamMember key={teamMember.id} teamMember={teamMember} />
        ))}
      </div>
    </section>
  );
}
