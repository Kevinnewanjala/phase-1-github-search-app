document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById('github-form');
    const userListElement = document.getElementById('user-list');
    const reposListElement = document.getElementById('repos-list');

    // Event listener for form submission
    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('search').value;
        if (!username) return;

        try {
            const userData = await fetchUserData(username);
            displayUserInfo(userData);
            const reposData = await fetchAllUserRepositories(username);
            displayReposCount(reposData.length); // Displaying the count of repositories
        } catch (error) {
            console.error('Error fetching GitHub user data:', error);
        }
    });

    // Fetch user data from GitHub API
    async function fetchUserData(username) {
        const url = `https://api.github.com/users/${username}`;
        const response = await fetch(url);
        return response.json();
    }

    // Fetch all repositories for the user (handling pagination)
    async function fetchAllUserRepositories(username) {
        let allRepositories = [];
        let page = 1;
        let repositories = [];
        do {
            repositories = await fetchUserRepositories(username, page);
            allRepositories = allRepositories.concat(repositories);
            page++;
        } while (repositories.length > 0);
        return allRepositories;
    }

    // Fetch repositories from a specific page
    async function fetchUserRepositories(username, page) {
        const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=100`;
        const response = await fetch(url);
        return response.json();
    }

    // Display user information
    function displayUserInfo(userData) {
        userListElement.innerHTML = '';
        const userInfoItem = document.createElement('li');
        userInfoItem.textContent = `Name: ${userData.name}, Bio: ${userData.bio}, Followers: ${userData.followers}, Following: ${userData.following}`;
        userListElement.appendChild(userInfoItem);
    }

    // Display the count of repositories
    function displayReposCount(count) {
        reposListElement.innerHTML = '';
        const reposCountItem = document.createElement('li');
        reposCountItem.textContent = `Number of Repositories: ${count}`;
        reposListElement.appendChild(reposCountItem);
    }
});
