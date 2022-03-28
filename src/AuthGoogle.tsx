import React, { VFC, useEffect } from 'react';
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  EmailAuthProvider,
} from 'firebase/auth/cordova';

import './App.css';

const AuthGoogle: VFC = () => {
  const auth = getAuth();
  useEffect(() => {
    // auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     console.log(JSON.stringify(user));
    //     alert(JSON.stringify(user));
    //   }
    // });
  }, []);
  const login = async () => {
    await signInWithRedirect(auth, new GoogleAuthProvider());
    const result = await getRedirectResult(auth);
    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result?.user;
      console.log(JSON.stringify(user));
    }

    //   //signInWithRedirect(auth, new EmailAuthProvider())
    //   .then(() => {
    //     console.log('signInWithRedirect⇒getRedirectResult');
    //     return getRedirectResult(auth);
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     if (result) {
    //       const credential = GoogleAuthProvider.credentialFromResult(result);
    //       // const credential = EmailAuthProvider.credential(result);

    //       // This gives you a Google Access Token.
    //       // You can use it to access the Google API.
    //       const token = credential?.accessToken;

    //       // The signed-in user info.
    //       const user = result?.user;
    //       console.log(JSON.stringify(user));
    //       alert(JSON.stringify(user));
    //     }

    //     // getRedirectResult(auth)
    //     //   .then((result) => {
    //     //     console.log('getRedirectResult');
    //     //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     //     const credential = GoogleAuthProvider.credentialFromResult(
    //     //       result as any,
    //     //     );
    //     //     const token = credential?.accessToken;
    //     //     alert(JSON.stringify(credential));
    //     //     // The signed-in user info.
    //     //     const user = result?.user;
    //     //     alert(JSON.stringify(user));
    //     //   })
    //     //   .catch((error) => {
    //     //     // Handle Errors here.
    //     //     const errorCode = error.code;
    //     //     const errorMessage = error.message;
    //     //     // The email of the user's account used.
    //     //     const email = error.email;
    //     //     // The AuthCredential type that was used.
    //     //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     //     // ...
    //     //   });
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     console.log(error);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert(`${errorCode}:${errorMessage}`);
    //   });
  };

  return (
    <>
      <button onClick={() => login()}>click</button>
    </>
  );
};

export default AuthGoogle;
