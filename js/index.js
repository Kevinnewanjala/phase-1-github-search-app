const userListElement = document.querySelector("#user-list");
const githubFormElement = document.querySelector("#github-form");
const searchInputElement = document.querySelector("#search");
const reposListElement = document.querySelector("#repos-list");

const gitHubToken = "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";

// Function to search GitHub for users by name
function searchUsersByName(searchQuery) {
  fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
    headers: {
      Authorization: `token ${gitHubToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => renderUserList(data.items));
}

// Function to fetch repositories for a specific user
function fetchUserRepositories(username) {
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${gitHubToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => renderUserRepositoriesList(data));
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  const searchQuery = searchInputElement.value.trim();
  if (searchQuery !== '') {
    searchUsersByName(searchQuery);
  }
}

// Function to render user search results
function renderUserList(users) {
  userListElement.innerHTML = ""; // Clear existing list
  users.forEach((user) => {
    const listItem = document.createElement("li");
    const userInfoContainer = document.createElement("div");
    const userAvatar = document.createElement("img");
    const userLink = document.createElement("a");

    userAvatar.src = user.avatar_url;
    userAvatar.alt = `${user.login} avatar`;

    userLink.href = user.html_url;
    userLink.textContent = user.login;

    // Event listener to fetch repositories on user click
    userLink.addEventListener("click", () => fetchUserRepositories(user.login));

    userInfoContainer.appendChild(userAvatar);
    userInfoContainer.appendChild(userLink);
    listItem.appendChild(userInfoContainer);
    userListElement.appendChild(listItem);
  });
}

// Function to render user repositories
function renderUserRepositoriesList(repositories) {
  reposListElement.innerHTML = ""; // Clear existing list
  repositories.forEach((repo) => {
    const listItem = document.createElement("li");
    const repoLink = document.createElement("a");

    repoLink.href = repo.html_url;
    repoLink.textContent = repo.name;

    listItem.appendChild(repoLink);
    reposListElement.appendChild(listItem);
  });
}

// Event listener for form submission
githubFormElement.addEventListener("submit", handleFormSubmission);

