# BATTLESHIPS

This is a single-player web-based version of the classic Battleships game. The player competes against an algorithmic computer opponent, strategically placing their own ships and taking turns to guess the location of their opponent's ships. The goal is to sink all enemy ships before losing your own fleet.

Authors: [Darren Baldwin](https://github.com/DBaldwin8) & [Matt Mannings](https://github.com/Jago971)

Technologies: HTML5, CSS3, JavaScript

# 📖 Table of Contents

- 🔹 [Features](#features)

  - 🤖 [Algorithmic Computer Opponent](#algorithmic-computer-opponent)
  - 📜 [Dynamic Instruction Window](#dynamic-instruction-window)
  - 🎵 [Custom Sound Effects](#custom-sound-effects)
  - 🎨 [Custom Visuals](#custom-visuals)

- 🚢 [Game Flow](#game-flow)

- 🧠 [Computer Opponent Algorithm](#computer-opponent-algorithm)

- 📝 [Licencing](#licencing)

## Features

### **Algorithmic Computer Opponent**

The ACO opponent is designed to provide a strategic and challenging experience by algorithmically selecting its moves. It places ships randomly while ensuring they do not overlap. During gameplay, it tracks all previous shots, avoiding duplicate moves and adapting its targeting strategy based on hits and misses. The ACO systematically searches for ships, locks onto targets once a hit is found, and continues attacking until the ship is sunk before resuming its broader search. This approach ensures an engaging and competitive challenge for the player.

For more information on how th algorith works, see section [Computer Opponent Algorithm](#computer-opponent-algorithm).

### **Dynamic Instruction Window**

To enhance the player experience, the game includes a **dynamic instruction window** that guides the player through each stage with fun, theatrical prompts. Instead of static text, the instructions unfold like a **naval commander barking orders**, immersing the player in the role of a fleet captain.

- **Ship Placement:** "Commander, deploy your fleet! Choose your ship, set its direction, and position it wisely—our survival depends on it!"
- **Starting the Battle:** "All hands on deck! Hit the start button to confirm your fleet's positions. The enemy is lurking beneath the waves!"
- **Player Turn:** "Fire the cannons! Select your target coordinates and let them have it. A direct hit could turn the tide!"
- **Payer Turn on HIT:** "We've hit! Prepare to fire again!"
- **Opponent Turn:** "Brace for impact! The enemy is returning fire—watch for damage to our fleet!"
- **Victory or Defeat:** "The battle is won—or lost. Either way, history will remember this day. Ready to fight again?"

These engaging prompts make the game more immersive, giving players the sense of **commanding a real naval fleet** rather than just clicking buttons.

### **Custom Sound Effects**

Our game includes **custom sound effects** for various in-game actions, such as firing shots, hitting ships, and sinking vessels.

- **Sources:**
  - Sounds were generated using [elevenlabs.io](https://elevenlabs.io/app/sound-effects/generate)
  - Sounds were used from [soundLibraryWebsite](#)
- **Implemented Sounds:**
  - **Player turn** – sonar echo sound-effect whilst choosing coordinates on attack screen.
  - **Opponent turn** – Emergency siren to represent incoming attack from the opponent.
  - **Successful Hit** – Sound of explosion to represent a devastating hit on a player or opponent ship.
  - **Unsuccessful Miss** – Sound of underwater explosion to represent a miss from either the player or opponent.

### **Custom Visuals**

The game features **custom designed visuals** inspired by both **classic board games** and **modern digital adaptations**.

- **How They Were Made:**

  - Main game page is made using simple HTML5 and CSS3 styling with some Keyframe Animations.
  - Graphics were created using **vector-based design software** like **SoftwareName** and **SoftwareName**.

- **Visual Inspirations:**
  - Classic **Battleship** board games.
  - Military sonar and naval interface designs.
  - Digital adaptations of Battleship from various gaming platforms.

**Reference Images:**

1. [Classic Board Game Design](#)
2. [Sonar Screen Interface](#)
3. [Naval-Themed UI Design](#)

## Game-Flow

### **1. Player Ship Placement**

- The player selects a **ship** from the fleet display.
- The player chooses the **orientation** (horizontal or vertical) for the selected ship.
- The player picks a **position** on the board to place the ship.
- This process repeats until **all ships** are placed on the board.

### **2. Start Game**

- The player presses the **start** button to confirm ship placements.
- The **ACO opponent** determines the positions of its ships.
- The game is now ready to begin and transitions to player turn.

### **3. Player Turn**

- The player **selects coordinates** to attack on the sonar screen.
- The player presses the **fire** button to confirm the shot.
- The targeted coordinate lights up:
  - **Red** if it's a hit.
  - **White** if it's a miss.
- If player hits opponent ship successfully, player takes another turn.

### **4. Opponent Turn**

- The ACO opponent determines a coordinate to attack
- If the opponent **hits a ship**, the attacked coordinate lights up **red**, and the corresponding position on the matching ship in the player’s fleet display is also marked.
- If opponent hits player ship successfully, opponent takes another turn.

### **5. Sink All Ships**

- The game continues with alternating turns.
- When **all ships** from either side are sunk, the game **ends**.

### **6. Announce Winner & Restart**

- A message displays the **winner** (Player or Opponent).
- The player is given the option to **restart** the game by clicking the **restart** button.

## Computer Opponent Algorithm

The opponent uses our custom
**Battling Algorithmic Strategic Targeting And Random Destruction System** ™️.

This system uses a **multi-stage decision-making process** that adapts based on previous shots. Every shot taken is recorded and removed from the pool of available targets to avoid repetition. The ACO transitions through different **stages** depending on whether it hits or misses, ensuring a logical and efficient search pattern.

### **Stage 1: Random Search**

- The ACO **randomly selects** a coordinate from the **entire board**.
- If the shot **misses**, the ACO **remains in Stage 1** and fires randomly again next turn.
- If the shot **hits**, the ACO transitions to **Stage 2** to begin targeting adjacent locations.

### **Stage 2: Adjacent Search**

- The ACO **randomly selects** an available (not previously fired upon) coordinate **adjacent** to the last successful hit.
- If the shot **misses** and there are still adjacent options left, the ACO **stays in Stage 2** and fires at another adjacent coordinate next turn.
- If the shot **hits**, the ACO transitions to **Stage 3**, narrowing its attack pattern.

### **Stage 3: Directional Targeting**

- The ACO determines whether the hit ship is aligned along the **X-axis** or **Y-axis** by comparing the successful **Stage 1** and **Stage 2** shots.
- The ACO then **exclusively targets coordinates along the detected axis**.
- The next coordinate is randomly selected from **+1 or -1** along the axis, extending the attack in a linear fashion.
- The ACO continues this process:
  - If the shot **hits** and the ship is not yet sunk, it **continues Stage 3** and expands the attack range.
  - If the shot **misses** but there are still valid adjacent targets along the axis, it **stays in Stage 3** and tries another direction.
  - If the shot **hits and sinks the ship**, the ACO **resets to Stage 1** and resumes random searching.
  - If the shot **misses and there are no more options**, the ACO moves to **Stage 4**.

### **Stage 4: Opposite Orientation Targeting**

- The ACO **randomly selects a coordinate** adjacent to any previous successful hits **that did not result in a sunk ship**.
- If the shot **misses**, it stays in **Stage 4**, continuing to target available adjacent spaces.
- If the shot **hits**, the ACO **reverts to Stage 3**, treating this new hit as part of the same ship, but in the opposite orientation, and resumes its linear attack pattern. Once sunk, the ACO will return to stage 4.
- If no adjacent coordinates are available, return to stage 1.

### Summary

This method allows the ACO to efficiently **find and destroy ships** while avoiding unnecessary shots. By balancing **random searching** with **targeted attacks**, the ACO presents a challenging and strategic opponent.

## Licencing

This project is licensed under the MIT License.

You are free to use, modify, distribute, and share this project as long as you include the original copyright notice and disclaimers.

**MIT License**

Copyright (c) [2025] [Darren Baldwin & Matt Mannings]

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,  
OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.