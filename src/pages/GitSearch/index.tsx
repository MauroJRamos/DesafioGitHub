import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  git: string;
};

type Address = {
  name: string;
  location: string;
  followers: string;
  avatar_url: string;
  url: string;
};

const GitSearch = () => {
  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    git: '',
  });

  const handlehChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.git}`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });
  };

  return (
    <div className=" container-master">
      <div className="git-search-container">
        <div className="container search-container">
          <h1 className="">Encontre um perfil GitHub</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <input
                type="text"
                name="git"
                value={formData.git}
                className="search-input"
                placeholder="  Usuário GitHub"
                onChange={handlehChange}
              />

              <button type="submit" className="btn btn-primary search-button">
                Encontar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" card-container ">
        {address && (
          <div className="container card-container-result">
            <div className="container-result-card-input">
              <label htmlFor="Inforões" className="card-label">Informações</label>
              <ResultCard title="perfil:" description={address.url} />
              <ResultCard title="seguidores:" description={address.followers} />
              <ResultCard title="Localidade:" description={address.location} />
              <ResultCard title="nome:" description={address.name} />
            </div>
            <div className="container-img">
              <img className="img-profile" src={address.avatar_url} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitSearch;
