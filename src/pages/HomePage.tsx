import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'
import { KeySkills } from '../components/KeySkills'

export function HomePage() {
  return <><Hero /><div id="skills"><KeySkills /></div><Projects /><About /><Contact /></>
}
