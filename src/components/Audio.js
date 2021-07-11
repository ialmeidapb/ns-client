import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../routeComponents/Navbar"
import api from "../apis/api";


function RecordCreate() {
  const history = useHistory();

  const [state, setState] = useState({
    date_of_upload: "",
    media: "",
    title: "",

  });

  const { id } = useParams();

  function handleChange(event) {
    if (event.target.files) {
      setState({ ...state, [event.target.name]: event.target.files[0] });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  }

  async function handleFileUpload(file) {
    try {
      // FormData é uma função construtora global nativa do Javascript que cria um objeto de Formulario no formato multipart/form esperado pelo backend
      const uploadData = new FormData();

      // 'image' precisa bater com o valor de uploadCloud.single() no nosso backend
      uploadData.append("image", file);

      const response = await api.post("/media-upload", uploadData);

      return response.data.fileUrl;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      let uploadedAudio = "";
      if (state.media) {
        uploadedAudio = await handleFileUpload(state.media);
      }

      const response = await api.post(`/record/${id}`, {
        ...state,
        test_results: uploadedAudio,
      });

      // Redireciona programaticamente para a URL '/'
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="audio-upload">
    <Navbar/>
    
    <div className="container mt-5">
    <h1>Audio Uploader</h1>

<hr />
<form onSubmit={handleSubmit}>



  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input
      type="text"
      className="form-control"
      id="title"
      name="title"
      onChange={handleChange}
      value={state.title}
    />
  </div>



  <div className="form-group">
    <label htmlFor="audio">Audio</label>
    <input
      type="file"
      className="form-control"
      id="audio"
      name="media"
      onChange={handleChange}
      
    />
  </div>

  <hr />
  <button type="submit" className="btn btn-primary  mb-5">
    Submit
  </button>
</form>
</div>

    
      
    </div>
  );
}

export default RecordCreate;
