import styles from './page.module.css'
import Gallery from './gallery'
import UsersListProvider from './context/UsersListContext'

export default function Home() {
  return (
    <main className={styles.main}>
      <UsersListProvider>
        <Gallery />
      </UsersListProvider>
    </main>
  )
}
