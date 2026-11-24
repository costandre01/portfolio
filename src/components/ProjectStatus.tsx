export function ProjectStatus({ note }: { note?: string }) {
  if (!note) return null
  return <aside className="project-development"><strong>In development</strong><p>{note}</p></aside>
}
