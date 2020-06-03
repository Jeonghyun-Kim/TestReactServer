// IMPORTING LIBRARIES
import React from 'react';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { getMyInfo } from '../js/fetch_functions';

// IMPORTING DEFINES

export default () => {
  // TODO: user default value with json
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  // const [paintings, setPaintings] = React.useState([]);

  React.useEffect(() => {
    let isSubscribed = true;
    getMyInfo((resJson) => {
      if (isSubscribed) {
        switch (resJson.error) {
          case undefined:
            setUser(resJson.user);
            // setPaintings(resJson.paintings);
            setError(null);
            break;
          default:
            setError(resJson.error);
            break;
        }
        setLoading(false);
      }
    });
    return () => { isSubscribed = false; };
  }, []);

  return (
    <>
      <h2>My Page</h2>
      {error
        ? (
          <h1>{error}</h1>
        ) : (
          <>
            {isLoading
              ? (
                <h2>loading...</h2>
              ) : (
                <div>
                  <h5>nick: {user.nick}</h5>
                  <h5>name: {user.name}</h5>
                  <h5>email: {user.email}</h5>
                  <h5>gender: {user.gender}</h5>
                </div>
              )}
          </>
        )}
    </>
  );
};
