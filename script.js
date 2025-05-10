const form = document.getElementById('playerForm');
const tableBody = document.querySelector('#leaderboard tbody');
let players = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const rp = parseInt(document.getElementById('rp').value);
  const hp = parseInt(document.getElementById('hp').value);
  const lp = parseInt(document.getElementById('lp').value);

  const rating = Math.round((rp * 2.5 + hp * 1.5 + lp * 3) * 10) / 10;

  players.push({ name, rp, hp, lp, rating });
  players.sort((a, b) => b.rating - a.rating);

  renderTable();
  form.reset();
});

function renderTable() {
  tableBody.innerHTML = '';
  players.forEach((player, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${player.name}</td>
      <td>${player.rp}</td>
      <td>${player.hp}</td>
      <td>${player.lp}</td>
      <td>${player.rating}</td>
    `;
    tableBody.appendChild(row);
  });
}
