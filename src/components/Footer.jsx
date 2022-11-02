import styles from './Footer.module.css'
import li from '../img/in.png'
import git from '../img/github.png'

export default function Footer () {
  return (
    <div className={styles.footer}>
      <a href='https://www.linkedin.com/in/facundo-gonzalez-a40640244/' target='_blank' rel='noreferrer'>
        <img className={`${styles.in} ${styles.anchor}`} src={li} alt='linkedin' />
      </a>
      <a href='https://github.com/Facug03' target='_blank' rel='noreferrer'>
        <img className={styles.anchor} src={git} alt='github' />
      </a>
    </div>
  )
}
