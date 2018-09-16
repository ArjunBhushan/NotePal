const axios = require('axios')
//
// // SIGN UP
//
// axios({
//   method: 'post',
//   url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCCKQvjW__DJNAiWpm7ZNQvJd14uQSG57A',
//   data: {
//     email: 'test@email.com',
//     password: 'test123',
//     returnSecureToken: true
//   },
//   headers : {'Content-Type' : 'application/json'}
// })
//   .then((token) => {
//     console.log(token.data);
//   }).catch((err) => {
//     console.log(err.response.data.error);
//   });
//
// // SIGN IN
//
// const authenticate = () => {
//   axios({
//   method: 'post',
//   url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCCKQvjW__DJNAiWpm7ZNQvJd14uQSG57A',
//   data: {
//     email: 'test@email.com',
//     password: 'test123',
//     returnSecureToken: true
//   },
//   headers : {'Content-Type' : 'application/json'}
// })
//   .then((token) => {
//     console.log(token.data);
//   }).catch((err) => {
//     console.log(err.response.data.error);
//   });
// };
//
// const addNote = async () => {
//   token = await authenticate()
//   return token
// };
//
// // ADD NOTE
//
// const authenticate = () => {
//   return axios({
//     method: 'post',
//     url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCCKQvjW__DJNAiWpm7ZNQvJd14uQSG57A',
//     data: {
//       email: 'test@email.com',
//       password: 'test123',
//       returnSecureToken: true
//     },
//     headers : {'Content-Type' : 'application/json'}
//   })
// };
//
// const addNote = async () => {
//   token = await authenticate()
//   return token.data
// };
//
// addNote()
//   .then((token) => {
//     const userId = token.localId;
//     axios({
//       method: 'post',
//       url: `https://notepal-216511.firebaseio.com/notes.json?auth=${token.idToken}`,
//       data: {
//         image: 'test.jpg',
//         text: 'My nane is Arjun',
//         userId,
//         transFR: 'Je m\'apple Arjun',
//         summary: 'I am Arjun',
//         spellcheck: 'My name is Arjun'
//       }
//     })
//       .then((note) => {
//         console.log(note.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err)
//   });
//
// // CREATE GROUP
// axios({
//   method: 'post',
//   url: `https://notepal-216511.firebaseio.com/groups.json`,
//   data: {
//     ece106: {
//       name: 'Classical Mechanics',
//       description: 'Forces in nature and Newton\'s laws, Dynamics and circular motion, Work, Energy and conservation of energy. Linear Momentum and linear Impulse, Rotational Dynamics. Oscillations; Simple Harmonic Motion. Wave motion; Traveling waves and standing waves. Thermal Physics; Temperature, Thermal energy and Specific heat, Ideal gas heat engines and Refrigerators. [Offered: F]',
//       notes: {
//         '-LMVR6VrTuTel5F5z_s7': true
//       }
//     }
//   }
// })

//ADD NOTES TO GROUP
// axios({
//   method: 'patch',
//   url: `https://notepal-216511.firebaseio.com/groups/-LMVZINVwM674PNPlpVB/ece105.json`,
//   data: {
//     notes: {
//       '-LMVR6VrTuTel5F5z_s7': true
//     }
//   }
// })
//   .then((group) => {
//     console.log(group.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// GET COURSES
// axios({
//   method: 'get',
//   url: `https://notepal-216511.firebaseio.com/groups.json`,
// })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
