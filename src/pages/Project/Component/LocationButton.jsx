import { useNavigate } from "react-router-dom";


const LocationButton = ({location, style}) => {
    const nav = useNavigate();
    const defaultStyle = {
        backgroundColor: '#90B54C',
        color:'white',
        border:'none',
        borderRadius:5,
        width:40,
        height:40,
        boxShadow: '0 3px 2px rgba(0, 0, 0, 0.1)',
        fontSize: 30,
    }
    return(
        <button 
        onClick={()=>{nav(location)}}
        style={{ ...defaultStyle, ...style }}>
        {"<  ㅁ"}
        </button>
    )
}

export default LocationButton;