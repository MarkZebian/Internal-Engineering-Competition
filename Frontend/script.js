// ----- GAME STATE -----
let secretCode = [];
const CODE_LENGTH = 4;
const DIGIT_MAX = 7; // digits 0–7
let gameOver = false;

// ----- INITIAL SETUP -----
document.addEventListener("DOMContentLoaded", () => {
    // Populate dropdowns with 0–7
    for (let i = 0; i < CODE_LENGTH; i++) {
        const select = document.getElementById(`slot${i}`);
        for (let d = 0; d <= DIGIT_MAX; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            select.appendChild(option);
        }
    }

    document.getElementById("submitGuess").addEventListener("click", handleGuess);
    document.getElementById("newGame").addEventListener("click", startNewGame);

    startNewGame();
});

// ----- START / RESET GAME -----
function startNewGame() {
    secretCode = generateSecretCode();
    gameOver = false;

    // Reset status + history
    const status = document.getElementById("status");
    status.textContent = "New game started. Make a guess!";
    status.style.color = "#e5e7eb";

    document.getElementById("historyList").innerHTML = "";

    // Reset inputs to 0
    for (let i = 0; i < CODE_LENGTH; i++) {
        document.getElementById(`slot${i}`).value = "0";
    }

    // Enable guess button
    document.getElementById("submitGuess").disabled = false;

    // For debugging, you can temporarily log the secret:
    // console.log("Secret code:", secretCode.join(""));
}

function generateSecretCode() {
    const code = [];
    for (let i = 0; i < CODE_LENGTH; i++) {
        const digit = Math.floor(Math.random() * (DIGIT_MAX + 1));
        code.push(digit);
    }
    return code;
}

// ----- HANDLE GUESS -----
function handleGuess() {
    if (gameOver) return;

    const guess = [];
    for (let i = 0; i < CODE_LENGTH; i++) {
        const value = parseInt(document.getElementById(`slot${i}`).value, 10);
        guess.push(value);
    }

    const { black, white } = evaluateGuess(guess, secretCode);

    addHistoryRow(guess, black, white);

    const status = document.getElementById("status");

    if (black === CODE_LENGTH) {
        status.textContent = `You cracked the code! ✅ Secret was ${secretCode.join("")}`;
        status.style.color = "#22c55e";
        gameOver = true;
        document.getElementById("submitGuess").disabled = true;
    } else {
        status.textContent = `Black: ${black}, White: ${white}. Keep trying!`;
        status.style.color = "#e5e7eb";
    }
}

// ----- EVALUATE GUESS (BLACK + WHITE PEGS) -----
function evaluateGuess(guess, code) {
    // Copy arrays so we don't mutate originals
    const codeCopy = [...code];
    const guessCopy = [...guess];

    let black = 0;
    let white = 0;

    // 1) Count black pegs (correct digit + correct position)
    for (let i = 0; i < CODE_LENGTH; i++) {
        if (guessCopy[i] === codeCopy[i]) {
            black++;
            // Mark these as matched
            guessCopy[i] = null;
            codeCopy[i] = null;
        }
    }

    // 2) Count white pegs (correct digit, wrong position)
    for (let i = 0; i < CODE_LENGTH; i++) {
        if (guessCopy[i] === null) continue; // skip already matched

        const indexInCode = codeCopy.indexOf(guessCopy[i]);
        if (indexInCode !== -1) {
            white++;
            // Remove that matched digit so it can't be reused
            codeCopy[indexInCode] = null;
            guessCopy[i] = null;
        }
    }

    return { black, white };
}

// ----- UPDATE HISTORY UI -----
function addHistoryRow(guess, black, white) {
    const historyList = document.getElementById("historyList");

    const row = document.createElement("div");
    row.className = "history-row";

    const guessSpan = document.createElement("span");
    guessSpan.className = "guess";
    guessSpan.textContent = guess.join(" ");

    const resultSpan = document.createElement("span");
    resultSpan.textContent = `B: ${black}  W: ${white}`;

    row.appendChild(guessSpan);
    row.appendChild(resultSpan);

    historyList.prepend(row); // latest guess on top
}
