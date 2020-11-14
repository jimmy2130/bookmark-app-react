import React from 'react';
import './bookmark.styles.css';

const Bookmark = ({name, url, bookmarks, setBookmarks}) => {
  const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;

  const deleteBookmark = () => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== url)
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  }
  return(
    <div className="item">
      <i className="fas fa-times" title="Delete Bookmark" onClick={deleteBookmark}></i>
      <div className="name">
        <img src={faviconUrl} alt="Favicon"></img>
        <a href={url} target="_blank" rel="noreferrer">{name}</a>
      </div>
    </div>
  );
}

export default Bookmark;