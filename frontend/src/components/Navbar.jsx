import { Link } from 'react-router-dom';
import '../style/Navbar.css'

const Navbar = (props) => {
    return (
        <div className="navbar">
            <div>
                <Link to="/profile"><button>location.state.id</button></Link>
            </div>
            <div>
                <Link to="/home"><button>DARTHRIFT</button></Link>
            </div>
        </div>

    )
}

export default Navbar