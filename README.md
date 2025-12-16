# Internal-Engineering-Competition
Competing in an internal university competition in the programming section

This repository contains our full submission for the **Internal Engineering Competition (IEC)** in the **Programming Category**.  
Our project implements a complete digital version of the classic **Mastermind** game using both:

- **A Web-Based GUI** (HTML, CSS, JavaScript)
- **A Java Console Application** (OOP-based)

The goal was to create a functional, visually appealing, and algorithmically accurate Mastermind system that follows all IEC rules — including proper scoring logic, no double-counting, and a clean user experience.

---

## 🚀 Project Overview

Mastermind is a 4-digit code-breaking game where each guess is evaluated using:

- **Black Pegs** → correct digit in the correct position  
- **White Pegs** → correct digit in the wrong position  

Our implementation includes:

- A **dynamic web interface**
- A **Java implementation** with structured classes
- A fully validated **evaluateGuess() scoring algorithm**
- Support for exactly **10 attempts**
- Accurate enforcement of IEC competition rules

---

## 🧩 Features

### ✔ Web Version (HTML/CSS/JS)
- Fully interactive GUI  
- 10 guess rows rendered dynamically  
- Number palette (0–9)  
- Visual feedback pegs after each guess  
- Responsive layout  
- Clear instructions and status messages  
- Dark-mode inspired modern UI  

### ✔ Java Version
- OOP structured program  
- Handles:
  - Code generation  
  - Guess input  
  - Scoring logic  
  - Win/lose conditions  
- Clean separation of logic and UI (console)  
- Uses the same verified two-pass scoring algorithm  

---

## 🛠 Technologies Used

### Web Implementation
- HTML5  
- CSS3  
- JavaScript (ES6)

### Java Implementation
- Java 17+  
- OOP design pattern  
- Modular file structure

---

## 🧠 Algorithm Summary

Our `evaluateGuess()` logic follows the IEC-required two-step process:

1. **Black Peg Pass**  
   - Matches all digits in the correct position  
   - Marks those digits as “used.”

2. **White Peg Pass**  
   - Checks remaining unmatched digits  
   - Matches digits that appear elsewhere in the code  
   - Ensures *no double scoring*

This method handles repeated numbers correctly and matches the scoring method used in competitive Mastermind.

---

## 📁 Repository Structure

