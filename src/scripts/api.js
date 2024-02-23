const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: '32604bc8-d2fc-4c7c-8464-5a6bd2456ba1',
    'Content-Type': 'application/json',
  },
};

function getServerProfile() {
  return fetch(config['baseUrl'] + '/users/me', {
    headers: config['headers'],
  });
}

function getServerCards() {
  return fetch(config['baseUrl'] + '/cards', {
    headers: config['headers'],
  });
}

function patchServerProfile(inputNameFormProfile, inputDescriptionFormProfile) {
  return fetch(config['baseUrl'] + '/users/me', {
    method: 'PATCH',
    headers: config['headers'],
    body: JSON.stringify({
      name: inputNameFormProfile.value,
      about: inputDescriptionFormProfile.value,
    }),
  });
}

function postServerCard(item) {
  return fetch(config['baseUrl'] + '/cards', {
    method: 'POST',
    headers: config['headers'],
    body: JSON.stringify({
      name: item.name,
      link: item.link,
    }),
  });
}

function deleteServerCard(item) {
  return fetch(config['baseUrl'] + '/cards/' + item['_id'], {
    method: 'DELETE',
    headers: config['headers'],
  });
}

function putServerLike(item) {
  return fetch(config['baseUrl'] + '/cards/likes/' + item['_id'], {
    method: 'PUT',
    headers: config['headers'],
  });
}

function deleteServerLike(item) {
  return fetch(config['baseUrl'] + '/cards/likes/' + item['_id'], {
    method: 'DELETE',
    headers: config['headers'],
  });
}

function patchServerAvatar(link) {
  return fetch(config['baseUrl'] + '/users/me/avatar', {
    method: 'PATCH',
    headers: config['headers'],
    body: JSON.stringify({
      avatar: link,
    }),
  });
}

export {
  getServerProfile,
  getServerCards,
  patchServerProfile,
  postServerCard,
  deleteServerCard,
  putServerLike,
  deleteServerLike,
  patchServerAvatar,
};
