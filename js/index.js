document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('github-form').addEventListener('submit', handleSubmit)
function handleSubmit(e) {
    e.preventDefault();
    fetchUsers(e.target.search.value);
}
function fetchUsers(user) {
    fetch('https://api.github.com/search/users?q=${user}', {
        Accept: 'application/vnd.github.v3+json'
    })
    .then(resp => resp.json())
    .then(json => json.items.forEach(user => createUserList(user)))
}
function createUserList(user) {
    let li = document.createElement('li');
    li.className = 'user';
    li.innerHTML = `
        <img src="${user.avatar_url}" class="user-avatar" />
        <h3>${user.login}</h3>
        <a href="${user.html_url}">GitHub Profile</a>
    `
    li.addEventListener('click', () => {
        fetchRepos(user.login);
    });
    document.getElementById('user-list').appendChild(li);
}
function fetchRepos(userName) {
    fetch('https://api.github.com/users/${userName}/repos', {
        Accept: 'application/vnd.github.v3+json'
    })
    .then(resp => resp.json())
    .then(json => json.forEach(repo => createRepoList(repo)))
}
function createRepoList(repo) {
    let li = document.createElement('li');
    li.className = 'repo';
    li.innerHTML = `
        <p>${repo.name}</p>
        <a href="${repo.html_url}">Repo Link</a>
    `
    document.getElementBy('repos-list').appendChild(li);
}
})