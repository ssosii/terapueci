import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import "./readMore.scss";


const ReadMore = ({ children, wordLimit = 30 }) => {
    const words = children.split(' ');
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
  
    const displayText = isReadMore ? words.slice(0, wordLimit).join(' ') : words.join(' ');
  
    return (
      <Fragment>
        {words.length > wordLimit ? (
          <p className="text">
            {displayText}
            <span onClick={toggleReadMore} className="more link">
              {isReadMore ? 'Pokaż więcej' : ''}
            </span>
          </p>
        ) : (
          <p className="text">{children}</p>
        )}
      </Fragment>
    );
  };
  
  export { ReadMore };
