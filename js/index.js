const listOfUsersNode = document.querySelector("#user-list");
const githubFormNode = document.querySelector("#github-form");
const searchInputNode = document.querySelector("#search");
const listOfUsersReposNode = document.querySelector("#repos-list");

const gitHubToken = "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";

function searchAllUsersByString(searchString) {
  fetch(`https://api.github.com/search/users?q=${searchString}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${gitHubToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => renderUsers(data.items));
}

function fetchReposByUserName(userName) {
  fetch(`https://api.github.com/users/${userName}/repos`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${gitHubToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => renderUserRepos(data));
}

function buildGithubUserList(event) {
  event.preventDefault();
  let userName = searchInputNode.value;
  searchAllUsersByString(userName);
}

function renderUsers(users) {
  for (const li of listOfUsersNode.children) {
    li.remove();
  }

  users.forEach((user) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const a = document.createElement("a");
    const h1 = document.createElement("h1");

    h1.textContent = user.login;
    h1.addEventListener("click", handleUserRepositories);
    img.src = user.avatar_url;
    a.href = user.html_url;
    a.textContent = `${user.login} Profile`;

    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(a);

    li.appendChild(div);
    listOfUsersNode.appendChild(li);
  });
}

function handleUserRepositories(e) {
  const userName = e.target.textContent;
  fetchReposByUserName(userName);
}

function renderUserRepos(repos) {
  for (const li of listOfUsersReposNode.children) {
    li.remove();
  }

  repos.forEach((repo) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const a = document.createElement("a");
    const h1 = document.createElement("h1");

    h1.textContent = repo.name;
    a.href = repo.html_url;
    a.textContent = repo.name;

    div.appendChild(h1);
    div.appendChild(a);
    li.appendChild(div);
    listOfUsersReposNode.appendChild(li);
  });
}

githubFormNode.addEventListener("submit", buildGithubUserList);
