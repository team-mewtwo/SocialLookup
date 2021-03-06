import * as types from '../constants/actionTypes';

export const updateSignupFirstName = event => ({
  type: types.UPDATE_SIGNUP_FIRST_NAME,
  payload: event,
});

export const updateSignupLastName = event => ({
  type: types.UPDATE_SIGNUP_LAST_NAME,
  payload: event,
});

export const updateSignupFacebookUrl = event => ({
  type: types.UPDATE_SIGNUP_FACEBOOK_URL,
  payload: event,
});

export const updateSignupTwitterUrl = event => ({
  type: types.UPDATE_SIGNUP_TWITTER_URL,
  payload: event,
});

export const updateSignupLinkedInUrl = event => ({
  type: types.UPDATE_SIGNUP_LINKEDIN_URL,
  payload: event,
});

export const updateSignupGithubUrl = event => ({
  type: types.UPDATE_SIGNUP_GITHUB_URL,
  payload: event,
});

export const updateSignupInstagramUrl = event => ({
  type: types.UPDATE_SIGNUP_INSTAGRAM_URL,
  payload: event,
});

export const updateSignupEmail = event => ({
  type: types.UPDATE_SIGNUP_EMAIL,
  payload: event,
});

export const updateSignupPhoneNumber = event => ({
  type: types.UPDATE_SIGNUP_PHONE_NUMBER,
  payload: event,
});

export const updateSignupPassword = event => ({
  type: types.UPDATE_SIGNUP_PASSWORD,
  payload: event,
});

export const successfulSignup = email => ({
  type: types.SUCCESSFUL_SIGNUP,
  payload: email,
});

export const failedSignup = message => ({
  type: types.FAILED_SIGNUP,
  payload: message,
});

export const updateSignupAvatarUrl = avatarUrl => ({
  type: types.UPDATE_SIGNUP_AVATAR_URL,
  payload: avatarUrl
}); 

/* eslint-disable */
export const submitSignup = (redirectToMain) => {
  return (dispatch, getState) => {
    // Get user info from state.
    const {
      signupFirstName,
      signupLastName,
      signupFacebookUrl,
      signupTwitterUrl,
      signupLinkedInUrl,
      signupGithubUrl,
      signupInstagramUrl,
      signupEmail,
      signupPhoneNumber,
      signupPassword,
      signupAvatarUrl
    } = getState().userReducer;

    const signupInfoObj = {
      firstName: signupFirstName,
      lastName: signupLastName,
      facebookUrl: signupFacebookUrl,
      twitterUrl: signupTwitterUrl,
      linkedinUrl: signupLinkedInUrl,
      githubUrl: signupGithubUrl,
      instagramUrl: signupInstagramUrl,
      email: signupEmail,
      phoneNum: signupPhoneNumber,
      password: signupPassword,
      avatarUrl: signupAvatarUrl
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(signupInfoObj),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // if (data.signupSuccess) {
        redirectToMain();
        dispatch(successfulSignup(signupEmail));
        // } else {
        //   dispatch(failedSignUp(data.msg));
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
/* eslint-enable */

export const updateLoginEmail = event => ({
  type: types.UPDATE_LOGIN_EMAIL,
  payload: event,
});

export const updateLoginPassword = event => ({
  type: types.UPDATE_LOGIN_PASSWORD,
  payload: event,
});

export const successfulLogin = email => ({
  type: types.SUCCESSFUL_LOGIN,
  payload: email,
});

export const failedLogin = () => ({
  type: types.FAILED_LOGIN,
});

/* eslint-disable */
export const submitLogin = (redirectToMain) => {
  return (dispatch, getState) => {
    // Get user info from state.
    const {
      loginEmail,
      loginPassword,
      signupFirstName,
      signupLastName,
    } = getState().userReducer;

    const loginInfoObj = {
      email: loginEmail,
      password: loginPassword,
    };

    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(loginInfoObj),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loginSuccess) {
          redirectToMain();
          dispatch(successfulLogin(loginEmail));
        } else {
          dispatch(failedLogin());
        }
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(successfulSignup());
  };
};
/* eslint-enable */

export const updateGroups = data => ({
  type: types.UPDATE_GROUPS,
  payload: data,
});

export const updateCards = data => ({
  type: types.UPDATE_CARDS,
  payload: data,
});

/* eslint-disable */
export const getGroups = () => {
  return (dispatch, getState) => {
    fetch(`/getGroups`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(updateGroups(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

/* eslint-disable */
export const getCards = (groupId) => {
  console.log('groups action', groupId)
  return (dispatch, getState) => {
    fetch(`/getUserGroup/${groupId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(updateCards(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateGroup = groupId => ({
  type: types.UPDATE_GROUP,
  payload: groupId,
});

export const joinGroup = () => {
  return (dispatch, getState) => {
    const { currentGroup } = getState().leftContainerReducer;
    const {loggedInUser} = getState().userReducer;
    const userInfo = { currentGroup, loggedInUser }
console.log('adawd', currentGroup, loggedInUser)
    fetch(`/joinGroup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(userInfo),
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
