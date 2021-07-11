import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import api from "../apis/api";
import Navbar from "../routeComponents/Navbar"

function Profile() {
  const [state, setState] = useState({
    
    name: "",
    email: "",
    _id: "",
    uploads: [],
  });

  const { id } = useParams();
  // O useEffect é um Hook que executa a sua callback (primeiro parâmetro) toda vez que qualquer coisa na sua array de dependências (segundo parâmetro) sofre qualquer tipo de alteração. Caso a array de dependências esteja vazia, o useEffect roda a callback uma vez assim que o componente renderiza na tela (mesmo efeito do componentDidMount)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/profile/${id}`);

        console.log(response.data);

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="allSection">
    <Navbar/>
      <div className="container mt-5">
      <h2>Near Sea Audio Bank</h2>
      <p> Upload all your audio records and create your own audio bank.</p>
        <div className=" container">
          <div className="d-flex row justify-content-start align-items-center rounded ">

            <div className="col">
              <div className="card-body ">
                <h3 className="card-title">
                  Welcome, {state.name}!
                </h3>

                <p className="mb-0">
                  <strong>ID:</strong> {state._id}
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> {state.email}
                </p>
                <p className="mb-0">
                  <strong>Audios Uploded:</strong> {state.uploads.length}
                </p>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
