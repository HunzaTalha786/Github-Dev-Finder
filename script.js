function getUser() {
    const userInfo = document.getElementById('user-info');
    const username = document.getElementById('username').value.trim();
    
    // Clear previous result if any
    userInfo.innerHTML = '';
    
    if (!username) {
      userInfo.innerHTML = `<p>Please enter a username</p>`;
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((user) => {
        userInfo.innerHTML = `
          <div class="user-profile">
            <img src="${user.avatar_url}" alt="Avatar" class="avatar" />
            <h2>${user.name || "No Name"}</h2>
            <p>${user.bio || "No bio available"}</p>
            <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
            <p><strong>Followers:</strong> ${user.followers}</p>
          </div>
        `;
      })
      .catch((error) => {
        userInfo.innerHTML = `<p>${error.message}</p>`;
      });
  }