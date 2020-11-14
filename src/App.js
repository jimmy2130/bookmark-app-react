import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './components/modal/modal.component';
import Bookmark from './components/bookmark/bookmark.component';

function App() {

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const [bookmarks, setBookmarks] = useState(
    [
      // {
      //   name: 'Jacinto Design',
      //   url: 'https://jacinto.design',
      // },
    ]
  )
  const [showModal, setShowModal] = useState(false);

  const obj = {bookmarks, setBookmarks, showModal, toggleModal};

  useEffect(() => {
    // Get bookmarks from localStorage if available
    if(localStorage.getItem('bookmarks')) {
      setBookmarks(JSON.parse(localStorage.getItem('bookmarks')));
    } else {
      // Create bookmarks array in localStorage
      const firstBookmark = [
        {
          name: 'Jacinto Design',
          url: 'https://jacinto.design',
        },
      ];
      setBookmarks(firstBookmark);
      localStorage.setItem('bookmarks', JSON.stringify(firstBookmark));
    }
  }, [setBookmarks])



  return (
    <div>
      <h1 id="show-modal" onClick={toggleModal}>Add Bookmark</h1>
      <div className="container">
        {bookmarks.map((bookmark, index) => (
          <Bookmark key={index} {...bookmark} {...obj}/>
        ))}
      </div>
      <Modal {...obj}/>
    </div>
  );
}

export default App;
