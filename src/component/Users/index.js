import './styles.scss';

const Users = () => {
    return(
        <div className='users_container'>
            <h1 className='users_title'>Liste des membres du refuge</h1>
            <form>
                <input className='users_search' type='text' placeholder='Rechercher un membre'></input>
            </form>
            <table className='users_table'>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Rôle</th>
                    <th>Profil</th>
                </tr>   
                <tr>
                    <td>Nom</td>
                    <td>Prénom</td>
                    <td>Rôle</td>
                    <td>Profil</td>
                </tr>        
            </table>
        </div>
    )
}

export default Users ;