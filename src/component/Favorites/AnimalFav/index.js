import './styles.scss' ;

const AnimalFav = ({animal}) => {
    console.log(animal)
    return(
        <div className='animal-card__card--gradient'>
                <div 
                style={{backgroundImage:`url(http://matthieuskrzypczak-server.eddi.cloud:8080/api/images/animal/${animal.photo1})`}} 
                className='animal-card__card--image'
                >
                </div>
        </div>
    )
}

export default AnimalFav ;