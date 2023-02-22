import './styles.scss';

import { FiTrash2 } from "react-icons/fi";
import { IoPersonAddSharp, IoPersonSharp } from "react-icons/io5";

const Users = () => {
    return(
        <div className='users_container'>
            <h1 className='users_container-title'>Liste des membres du refuge</h1>
            <div className='users_container-header'>
                <form className="users_container-form">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                    <input className="users_container-form__input" placeholder="Rechercher un membre" required="" type="text" />
                    <button className="users_container-form__reset" type="reset">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </form>
                <IoPersonAddSharp size={'4vh'} className='users_container-icon' />
            </div>
            <table className='users_container-title-table'>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Rôle</th>
                    <th>Profil</th>
                    <th className='users_container-title-table--icon'>Supprimer</th>
                </tr>   
                <tr>
                    <td>Doe</td>
                    <td>John</td>
                    <td>
                        <select id="role" name="role">
                        <option value="benevole">bénévole</option>
                        <option value="salarie">salarié</option>
                        </select>
                    </td>
                    <td><IoPersonSharp size={'3vh'} className='users_container-title-table--icon' /></td>
                    <td><FiTrash2 size={'3vh'} className='users_container-title-table--icon' /></td>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>
                        <select id="role" name="role">
                        <option value="benevole">bénévole</option>
                        <option value="salarie">salarié</option>
                        </select>
                    </td>
                    <td><IoPersonSharp size={'3vh'} className='users_container-title-table--icon' /></td>
                    <td><FiTrash2 size={'3vh'} className='users_container-title-table--icon' /></td>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>
                        <select id="role" name="role">
                        <option value="benevole">bénévole</option>
                        <option value="salarie">salarié</option>
                        </select>
                    </td>
                    <td><IoPersonSharp size={'3vh'} className='users_container-title-table--icon' /></td>
                    <td><FiTrash2 size={'3vh'} className='users_container-title-table--icon' /></td>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>
                        <select id="role" name="role">
                        <option value="benevole">bénévole</option>
                        <option value="salarie">salarié</option>
                        </select>
                    </td>
                    <td><IoPersonSharp size={'3vh'} className='users_container-title-table--icon' /></td>
                    <td><FiTrash2 size={'3vh'} className='users_container-title-table--icon' /></td>
                </tr>   
            </table>
        </div>
    )
}

export default Users ;