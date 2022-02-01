import {Navigate, useNavigate} from 'react-router-dom'

import ProjectForm from '../Project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){

    const history = useNavigate()

    function createPost(project){
        //initialize cost and services
        project.cost=0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body:JSON.stringify(project),
        })
        //).catch(err =>console.log(err))

        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            // redirect
            history('/projects',{message:'Projeto criado com sucesso!'})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NewProject