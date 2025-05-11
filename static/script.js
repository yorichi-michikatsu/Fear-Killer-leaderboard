function addPlayer() {
    const playerName = document.getElementById("player-name").value;
    const rp = parseFloat(document.getElementById("rp").value);
    const hp = parseFloat(document.getElementById("hp").value);
    const lp = parseFloat(document.getElementById("lp").value);

    if (!playerName || isNaN(rp) || isNaN(hp) || isNaN(lp)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const player = {
        playerName,
        rp,
        hp,
        lp,
        rating: (rp * 1) + (hp * 1.5) + (lp * 2)
    };

    fetch('/add_player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Player added successfully!");
            updateLeaderboard(); // Reloads updated leaderboard
        }
    })
    .catch(error => console.error('Error:', error));
}

function changeVoidablePrimeName() {
    const newName = document.getElementById("new-voidable-prime-name").value;

    fetch('/change_voidable_prime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("voidable-prime-name").textContent = newName;
            alert("Voidable Prime name changed!");
        }
    })
    .catch(error => console.error('Error:', error));
}
