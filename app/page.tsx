import styles from './page.module.css'

import Gallery from './gallery'
import { Quote } from './quote'

export default async function Home() {
  const result = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!result.ok || result.status !== 200) {
    return (
      <main className={styles.main}>
        <h1>Something went wrong.</h1>
      </main>
    )
  }

  const users = await result.json()

  return (
    <main className={styles.main}>
      <Quote />
      <Gallery users={users} />
    </main>
  )
}
