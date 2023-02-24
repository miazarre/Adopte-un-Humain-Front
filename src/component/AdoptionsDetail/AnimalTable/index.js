import './styles.scss'
import React from 'react';

const AnimalTable = ({animalTable}) => {
    return(
        <div>
            <table className='animaltable_container-table'>
                <tr>
                    <th>Nom</th>
                    <th>Profil</th>
                    <th>Statut</th>
                    <th>Détails</th>
                </tr> 
                { animalTable }
            </table>
        </div>
    )
}

export default AnimalTable ;