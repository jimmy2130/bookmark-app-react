import React, { useState } from 'react';
import './modal.styles.css';

const Modal = ({ bookmarks, setBookmarks, showModal, toggleModal }) => {

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const validate = (nameValue, urlValue) => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue) {
      alert('Please submit values for both fields.');
      return false;
    }
    if(!urlValue.match(regex)) {
      alert('Please provide a valid web address');
      return false;
    }
    // Valid
    return true;
  }

  const storeBookmark = (e) => {
    let urlValue = url;
    let nameValue = name;
    e.preventDefault();
    e.target.reset();

    if(!urlValue.includes('http://', 'https://')) {
      urlValue = `https://${urlValue}`;
    }
    if(!validate(nameValue, urlValue)) {
      return false;
    }
    const bookmark = {
      name: nameValue,
      url: urlValue,
    };

    setBookmarks([...bookmarks, bookmark]);
    toggleModal();

    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, bookmark]));
  }

  const getUrl = (e) => {
    setUrl(e.target.value);
  }

  const getName = (e) => {
    setName(e.target.value);
  }

  return(
    <div className={`modal-container ${showModal ? "show-modal" : ""}`}>
      <div className="modal">
        <i className="fas fa-times close-icon" onClick={toggleModal}></i>
        <div className="modal-header">
          <h3>Add Bookmark</h3>
        </div>
        <div className="modal-content">
          <form onSubmit={storeBookmark}>
            <div className="form-group">
              <label htmlFor="website-name" className="form-label">Website Name</label>
              <input type="text" className="form-input" onChange={getName}></input>
            </div>
            <div className="form-group">
              <label htmlFor="website-url" className="form-label">Website URL</label>
              <input type="text" className="form-input" onChange={getUrl}></input>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;