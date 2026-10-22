import { useState, useEffect } from 'react'
import {
  profileService,
  educationService,
  certificationService,
  projectService,
  experienceService,
  contactService,
} from '../components/services/api'

import AboutSection from '../components/Fragments/AboutSection'
import EducationSection from '../components/Fragments/EducationSection'
import SkillsSection from '../components/Fragments/SkillsSection'
import CertificationsSection from '../components/Fragments/CertificationsSection'
import ProjectsSection from '../components/Fragments/ProjectsSection'
import ExperienceSection from '../components/Fragments/ExperienceSection'
import FooterSection from '../components/Fragments/FooterSection'

export default function HomePage() {
  const [profile, setProfile] = useState(null)
  const [education, setEducation] = useState([])
  const [certifications, setCertifications] = useState([])
  const [projects, setProjects] = useState([])
  const [experience, setExperience] = useState([])
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  // Scroll ke section projek setelah data selesai load (kembali dari halaman detail)
  // Gunakan flag, bukan Y-coordinate, agar tidak ter-offset oleh perubahan tinggi halaman
  useEffect(() => {
    if (loading) return
    const flag = sessionStorage.getItem('scroll_to_projects')
    if (flag) {
      sessionStorage.removeItem('scroll_to_projects')
      document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' })
    }
  }, [loading])

  useEffect(() => {
    async function fetchAll() {
      try {
        const [p, edu, certs, proj, exp, con] = await Promise.allSettled([
          profileService.get(),
          educationService.list(),
          certificationService.list(),
          projectService.list(),
          experienceService.list(),
          contactService.get(),
        ])
        if (p.status === 'fulfilled') setProfile(p.value)
        if (edu.status === 'fulfilled') setEducation(edu.value)
        if (certs.status === 'fulfilled') setCertifications(certs.value)
        if (proj.status === 'fulfilled') setProjects(proj.value)
        if (exp.status === 'fulfilled') setExperience(exp.value)
        if (con.status === 'fulfilled') setContact(con.value)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return (
    <>
      <AboutSection profile={profile} loading={loading} contact={contact} />
      <EducationSection items={education} loading={loading} />
      <SkillsSection profile={profile} loading={loading} />
      <CertificationsSection items={certifications} loading={loading} />
      <ProjectsSection items={projects} loading={loading} githubUrl={contact?.github_url} />
      <ExperienceSection items={experience} loading={loading} />
      <FooterSection contact={contact} loading={loading} />
    </>
  )
}
