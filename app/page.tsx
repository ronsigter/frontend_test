import styles from "./page.module.css";

import Gallery from "./gallery";

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
      <Gallery users={users} />
    </main>
  );
}
