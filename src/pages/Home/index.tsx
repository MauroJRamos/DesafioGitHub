import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => {
    return (
        <div className="home-container">
           <div className="home-containe-text">
            <h2>Desafio GitHub API</h2>
            <h6>Bootcamp Spring React - DevSuperior</h6>
            </div>
            <Link to="/gitsearch">
                <button className=" btn-primary start-button">Começar</button>
            </Link>
        </div>
    );
}

export default Home;
