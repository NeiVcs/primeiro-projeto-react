import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import{useParams} from 'react-router-dom'
import{useState, useEffect} from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../Project/ProjectForm'
import ServiceForm from '../service/ServiceForm'

function Project(){
    
    const {id} = useParams()
    
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() =>{
       setTimeout(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
        })
        .catch((err) => console.log)
       }, 1000)
    }, [id])

    function editPost(project){
        setMessage('')
        //budget validation
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) =>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function createService(project){
        
        const lastService = project.services[project.services.lenght - 1]
        
        lastService.id = uuidv4()
    
        const lastServiceCost = lastService.cost
        
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'content-Type':'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            //exibir
            console.log(data)
        })
        .catch((err) => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return (<>
    {project.name ? (
        <div className={styles.project_details}>
            <Container custtomClass="column">
                {message && <Message type={type} msg={message} />}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                    </button>
                    {!showProjectForm ? (
                        <div className='styles.project_info'>
                            <p>
                                <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de orçamento:</span> R$ {project.budget}
                            </p>
                            <p>
                                <span>Total utilizado:</span> R$ {project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className='styles.project_info'>
                            <ProjectForm 
                            handleSubmit={editPost} 
                            btnText="Concluir Edição" 
                            projectData={project} />
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && <ServiceForm 
                                handleSubmit={createService}
                                btnText="Adicionar serviço"
                                projectData={project}
                            />
                            }
                        </div>
                </div>
                <h2>Serviços</h2>
                <Container custtomClas="start">
                    <p>itens</p>
                </Container>
            </Container>
        </div>
    ) : ( 
        <Loading />
    )}
    
    </>)
}

export default Project
//aula 35 para visualização de serviços