import { useState, useRef, useEffect } from "react";
import './App.css'
import Foto from '../../assets/Foto.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faVideo, faMicrophone, faTag, faThumbsUp, faComment, faShare, faCircleCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [modalText, setModalText] = useState(""); // Texto del modal
  const textareaRef = useRef(null);

  // Manejar el cambio en el archivo de imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Mostrar vista previa de la imagen seleccionada
      setShowModal(true); // Abrir el modal
    }
  };

  // Manejar el envío del post
  const handleSubmit = () => {
    const newPost = { text: modalText || text, image };
    setPosts([newPost, ...posts]); // Agregar nuevo post
    setText(""); // Limpiar campo de texto
    setImage(null); // Limpiar imagen
    setIsActive(false); // Resetear estado para ocultar los botones
    setModalText(""); // Limpiar texto del modal
    setShowModal(false); // Cerrar el modal
  };

  // Activar botones cuando se hace clic en el input
  const handleClick = () => {
    setIsActive(true);
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "33px"; // Restablece la altura para que se ajuste
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
  };

  useEffect(() => {
    autoResize(); // Ajusta la altura cuando el componente se renderiza
  }, [text]); // Se ejecuta cada vez que cambia el texto

  const fileInputRef = useRef(null);

  const handleClick2 = () => {
    fileInputRef.current.click(); // Abre el selector de archivos cuando se hace clic en el icono
  };

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  // Manejar el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="body">
        <div className="content1">
          <div className="foto">
            <img src={Foto} alt="" />
          </div>
          <textarea
            className="input"
            type="text"
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Qué estás pensando?"
            onClick={handleClick}
          />
        </div>

        {isActive && (
          <>
            <div className="content2">
              <div>
                <div className="flex">
                  <p>Agrega</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="file-input"
                    onChange={handleImageChange} // Muestra la imagen seleccionada
                  />
                  <button className="file-input-button" onClick={handleClick2}>
                    <FontAwesomeIcon className="icon" icon={faFileImage} />
                  </button>
                    <FontAwesomeIcon className="icon2" icon={faVideo} />
                    <FontAwesomeIcon className="icon2" icon={faMicrophone} />
                    <FontAwesomeIcon className="icon2" icon={faTag} />
                </div>
              </div>
              <div className="select">
                <select name="" className="publico">
                  <option value="">Público</option>
                  <option value="">Solo para mí</option>
                </select>
              </div>
              <div className="publicar">
                <button onClick={handleSubmit}>Publicar</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal para la vista previa de la imagen */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>Crear Publicación</h3>
            <hr />
            <br />
            {image && (
              <div className="modal-image-preview">
                <img src={image} alt="Vista previa" />
              </div>
            )}
            <div className="modal_input">
              <div className="content_input">
                <textarea
                  className="input"
                  value={modalText}
                  onChange={(e) => setModalText(e.target.value)}
                  placeholder="Qué estás pensando?"
                />
              </div>
              <div className="publicar">
                <button onClick={handleSubmit}>Publicar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar las publicaciones */}
      <div className="body2" >
        {posts.map((post, index) => (
          <div key={index} className="post">
            <div className="post-content">
              <div className="fixed-image-container">
                <img className="fixed-image" src={Foto} alt="" />
              </div>
              <div className="text_foto">
                <div className="contents">
                  <div>
                    <strong>Diego Méndez</strong><FontAwesomeIcon className="icon" icon={faCircleCheck}/><strong>. 5min</strong>
                  </div>
                  <div>
                    <FontAwesomeIcon className="icon2" icon={faEllipsis}/> <br />
                  </div>
                </div>

                <div>
                  {post.image && <img className="post-image" src={post.image} alt="Publicación" />}
                </div>
                <div className="postText">
                  <p>{post.text}</p>
                </div>
                <hr />
                <div className="iconos_post">
                  <div className="icon_p" onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <p>{likeCount} Likes</p>
                  </div>
                  <div className="icon_p">
                    <FontAwesomeIcon icon={faComment} />
                    <p>10K Comments</p>
                  </div>
                  <div className="icon_p">
                    <FontAwesomeIcon icon={faShare} />
                    <p>42 Shares</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}

export default App;
