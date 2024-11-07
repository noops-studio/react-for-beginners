import './Spinner.css'
import spinnerImageSrc from '../../../assets/images/spinner.gif'

function Spinner(): JSX.Element {
    return (
        <div className='Spinner'>
            <img src={spinnerImageSrc} alt=""/>
        </div>
    )
}

export default Spinner