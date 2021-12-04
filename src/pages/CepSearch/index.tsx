import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  cep: string;
};

type Address = {
  name: string;
  location: string;
  followers: string;
  avatar_url: string;
  url:string;
};

const CepSearch = () => {
  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    cep: '',
  });

  const handlehChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.cep}`)
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
      <div className="cep-search-container">
        <div className="container search-container">
          <h1 className="">Encontre um perfil GitHub</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <input
                type="text"
                name="cep"
                value={formData.cep}
                className="search-input"
                placeholder="CEP (somente números)"
                onChange={handlehChange}
              />

              <button type="submit" className="btn btn-primary search-button">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container card-container ">
        {address && (
          <div className="card-container-result">
            <div>
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

export default CepSearch;
