let UsersTemplateContainer = document.querySelector('[data-users-template]');
let searchInput = document.querySelector('[data-search]');
let UserCardContainer = document.querySelector('[data-user-card]');


let users = [];

searchInput.addEventListener('input', (e) =>{
    let value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isVisible =
          user.name.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value);
        user.element.classList.toggle('hide', isVisible)
    });
})

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    users = data.map((user) => {

        const card = UsersTemplateContainer.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");

        header.textContent = user.name;
        body.textContent = user.email;

        UserCardContainer.append(card);

        return {
            name: user.name,
            email: user.email,
            element: card,
        };
    });
});