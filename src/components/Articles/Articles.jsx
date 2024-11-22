
import React, { useRef } from 'react';
import "./Articles.scss";

function Articles({articles}) {



  return (
    <div className='articles'>
       <h2 className='articles--heading'>{articles.title}</h2>
       <h3 className="articles--subtitle">{articles.short}</h3>
       <p className="articles--description">{articles.content}</p>
    </div>
  );
}

export default Articles;
