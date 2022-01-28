import styles from './Home.module.css'
import image from '../../img/Panda_rico.jpg'
import LinkButton from '../layout/LinkButton'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newProject" text="Criar projeto"/>
            <img src={image} alt='costs'/>
        </section>
    )
}

export default Home