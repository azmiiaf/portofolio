import LoadingSpinner from "../Elements/LoadingSpinner";
import EmptyState from "../Elements/EmptyState";
import { ArrowDown , ArrowUpRight} from "lucide-react";

export default function AboutSection({ profile, loading, contact }) {
  if (loading) return <LoadingSpinner text="Memuat profil..." />;
  if (!profile) return <EmptyState message="Profil belum tersedia." />;

  return (
    <section id="about" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="flex flex-col gap-6 reveal">
            <span className="section-tag font-spacemono">Halo, saya</span>
            <h1 className="text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] leading-[1.05] font-ibm">
              {profile.name}
            </h1>
            <p className="text-xl text-[var(--color-accent)] font-medium font-spacemono">
              {profile.role}
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-white max-w-md">
              {profile.short_description}
            </p>

            {/* Skills preview */}
            {/* {profile.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            )} */}

            {/* section button github and project */}
            <div className="flex gap-5">
            <a
              href={contact.github}
              target="_blank"
              className="bg-[#5D29F8] border-black rounded-full w-fit  px-8 py-2 font-semibold text-red flex justify-center gap-2  font-spacemono"
            >
              Github
              <ArrowUpRight size={20} strokeWidth={2.4} />{" "}
            </a>
            <a
              href="#projects"
              className="bg-[var(--color-accent)] border-black rounded-full w-fit  px-8 py-2 font-bold flex justify-center gap-2 text-base  font-spacemono"
            >
              Project
              <ArrowDown size={20} strokeWidth={2.4} />{" "}
            </a>
            </div>

            {/* Photo mobile */}
            {profile.photo_url && (
              <div className="md:hidden mt-4">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border border-[var(--color-border)]">
                  <img
                    src={profile.photo_url}
                    alt={`Foto ${profile.name}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Photo side — desktop */}
          {profile.photo_url && (
            <div className="hidden md:flex justify-center reveal">
              <div className="relative">
                <div className="w-72 h-80 rounded-2xl overflow-hidden border border-[var(--color-border)]">
                  <img
                    src={profile.photo_url}
                    alt={`Foto ${profile.name}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Subtle accent corner */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl bg-[var(--color-accent)] opacity-90 -z-10" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
