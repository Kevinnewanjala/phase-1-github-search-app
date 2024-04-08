document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById('github-form');
    const userListElement = document.getElementById('user-list');
    const reposListElement = document.getElementById('repos-list');

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('search').value;
        if (!username) return;

        try {
            const userData = await fetchUserData(username);
            displayUserInfo(userData);
            const reposCount = await fetchUserRepositoriesCount(username);
            displayReposCount(reposCount);
        } catch (error) {
            console.error('Error fetching GitHub user data:', error);
        }
    });

    async function fetchUserData(username) {
        const url = `https://api.github.com/users/${username}`;
        const response = await fetch(url);
        return response.json();
    }

    async function fetchUserRepositoriesCount(username) {
        const url = `https://api.github.com/users/${username}`;
        const response = await fetch(url);
        const userData = await response.json();
        return userData.public_repos;
    }

    function displayUserInfo(userData) {
        userListElement.innerHTML = '';
        const userInfoItem = document.createElement('li');
        userInfoItem.textContent = `Name: ${userData.name}, Bio: ${userData.bio}, Followers: ${userData.followers}, Following: ${userData.following}`;
        userListElement.appendChild(userInfoItem);
    }

    function displayReposCount(count) {
        reposListElement.innerHTML = '';
        const reposCountItem = document.createElement('li');
        reposCountItem.textContent = `Number of Repositories: ${count}`;
        reposListElement.appendChild(reposCountItem);
    }
});
