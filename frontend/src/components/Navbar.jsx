import { Link } from 'react-router-dom';
import '../style/Navbar.css'

const Navbar = (props) => {
    const username = localStorage.getItem('darthrift-user') ? JSON.parse(localStorage.getItem('darthrift-user')).username : "guest";

    return (
        <div className="navbar">
            <div>
                <Link to="/profile"><button>{username}</button></Link>
            </div>
            <div>
                <Link to="/chat"><button id="chat-b">CHAT<i className="pi pi-comment" style={{ fontSize: '1rem' }}></i></button></Link>
                <Link to="/" id="home-b"><button>DARTHRIFT</button></Link>
            </div>
        </div>

    )
}

export default Navbar