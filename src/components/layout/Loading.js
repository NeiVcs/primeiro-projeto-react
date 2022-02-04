import loading from '../../img/Panda-loading.png'

import styles from './Loading.module.css' 

function Loading (){
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="loading"></img>
        </div>
    )
}

export default Loading