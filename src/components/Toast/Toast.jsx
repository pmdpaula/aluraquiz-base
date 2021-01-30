import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Toast = (props) => {
  const {
    toastList, position, autoDeleteTime,
  } = props;
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList([...toastList]);

    // eslint-disable-next-line
    }, [toastList]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDeleteTime, list]);

  return (
    <>
      <div className={`notification-container ${position}`}>
        {
          list.map((toast, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={`notification toast ${position}`}
              style={{ backgroundColor: toast.backgroundColor }}
            >
              <button
                type="button"
                onClick={() => deleteToast(toast.id)}
              >
                X
              </button>
              {/* <div className="notification-image">
                <img src={toast.icon} alt="" />
              </div> */}
              <div>
                <p className="notification-title">{toast.title}</p>
                <p className="notification-message">
                  {toast.description}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

Toast.propTypes = {
  toastList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,

  })).isRequired,
  position: PropTypes.string.isRequired,
  autoDeleteTime: PropTypes.number.isRequired,
};

export default Toast;
