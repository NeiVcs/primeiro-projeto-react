import { Link } from "react-router-dom"

import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/logo.png'

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/"><img src={logo} alt="costs"/></Link>
                <ul className={styles.list}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/Company">Company</Link>
                    </li>
                    <li>    
                        <Link to="/NewProject">New Project</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar