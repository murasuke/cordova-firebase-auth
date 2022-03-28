import React, { VFC, useEffect, useState } from 'react';
import { getAuth, User } from 'firebase/auth/cordova';
import AuthGoogle from 'AuthGoogle';
import AuthFirebaseUI from 'AuthFirebaseUI';

import './App.css';

const App: VFC = () => {
  const [user, setUser] = useState<User>();
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(async (u) => {
      if (u) {
        console.log(JSON.stringify(user));
        alert(`login:${u.displayName}`);
        setUser(u);
      } else {
        setUser(undefined);
      }
    });
  }, [auth]);

  return (
    <div className="App">
      {/* <AuthGoogle /> */}

      {user ? user.displayName + 'logged in.' : 'not loggin'}
      {user ? (
        <input
          type="button"
          onClick={() => getAuth().signOut()}
          value="logout"
        />
      ) : (
        <AuthFirebaseUI />
      )}
    </div>
  );
};

export default App;
