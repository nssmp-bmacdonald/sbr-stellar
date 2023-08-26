export async function userLogout() {
  const url = `/login/api/logout/`;

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .catch(() => {
      return null;
    });
}
