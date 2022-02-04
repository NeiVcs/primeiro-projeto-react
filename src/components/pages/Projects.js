//npm run backend

import { useLocation } from 'react-router-dom'

import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../Project/projectCard'

import styles from './Projects.module.css'
import { useState, useEffect } from 'react'

function Projects(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [ProjectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects',{
        method: 'GET',
        headers:{
            'content-Type':'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')

        }) 
        .catch(err => console.log(err))
        
    }
//rever message aqui
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                 <LinkButton to="/newproject" text="criar projeto"/>
            </div>
                {message && <Message type="success" msg={message}/>}
                {ProjectMessage && <Message type="success" msg={ProjectMessage}/>}
                <Container customClass="start">
                    {projects.length > 0 &&
                        projects.map((project) =>(
                            <ProjectCard 
                                id={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id}
                                handleRemove={removeProject}
                            />
                    ))}
                {!removeLoading && <Loading/>}
                {!removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados!</p>
                )}
                </Container>
        </div>
    )
}
//qualquer coisa ver a aula 28
export default Projects