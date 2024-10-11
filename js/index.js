document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('github-form');
	const userList = document.getElementById('user-list');
	const reposList = document.getElementById('repos-list');
	const searchInput = document.getElementById('search');

	// Handle form submit
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const searchQuery = searchInput.value;
		if (searchQuery) {
			searchGitHubUsers(searchQuery);
		}
	});

	// Fetch GitHub users based on the search query
	function searchGitHubUsers(query) {
		const apiUrl = `https://api.github.com/search/users?q=${query}`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				displayUsers(data.items);
			})
			.catch((error) => console.error('Error fetching GitHub users:', error));
	}

	// Display the list of users in the DOM
	function displayUsers(users) {
		userList.innerHTML = ''; // Clear previous results
		reposList.innerHTML = ''; // Clear repos list

		users.forEach((user) => {
			const li = document.createElement('li');
			const userLink = document.createElement('a');
			userLink.href = user.html_url;
			userLink.target = '_blank';
			userLink.textContent = user.login;

			const userButton = document.createElement('button');
			userButton.textContent = 'View Repos';
			userButton.addEventListener('click', () => fetchUserRepos(user.login));

			li.appendChild(userLink);
			li.appendChild(userButton);
			userList.appendChild(li);
		});
	}

	// Fetch repositories of a selected user
	function fetchUserRepos(username) {
		const reposApiUrl = `https://api.github.com/users/${username}/repos`;

		fetch(reposApiUrl)
			.then((response) => response.json())
			.then((data) => {
				displayRepos(data);
			})
			.catch((error) => console.error('Error fetching repos:', error));
	}

	// Display the list of repositories in the DOM
	function displayRepos(repos) {
		reposList.innerHTML = ''; // Clear previous repos

		repos.forEach((repo) => {
			const li = document.createElement('li');
			const repoLink = document.createElement('a');
			repoLink.href = repo.html_url;
			repoLink.target = '_blank';
			repoLink.textContent = repo.name;

			li.appendChild(repoLink);
			reposList.appendChild(li);
		});
	}
});
