# ETH-AVAX-Module 2
## Overview

The `Donation` smart contract is designed to facilitate transparent and decentralized fundraising on the Ethereum blockchain. Users can contribute ETH towards a specified goal, and the contract owner can withdraw the funds once the goal is achieved.

## Features

- **Set Contribution Goal:** The contract owner can define a fundraising goal.
- **Contribute ETH:** Users can contribute ETH towards the goal.
- **Withdraw Funds:** The contract owner can withdraw the funds once the goal is met.
- **Event Logging:** Events are emitted for key actions such as contributions, goal definition, and fund extraction.

## Functionality

### Define Contribution Goal

The contract owner sets a fundraising goal using the `defineGoal` function. This goal must be greater than zero.

### Contribute ETH

Users can contribute ETH to the contract using the `contribute` function. Contributions must be greater than zero. The total contributions are tracked by the contract.

### Withdraw Funds

Once contributions have been made, the contract owner can withdraw the funds using the `extractFunds` function. The total contributions are reset to zero upon withdrawal.

## Events

- **ContributionReceived:** Emitted when a contribution is received. Includes the contributor's address and the amount contributed.
- **FundsExtracted:** Emitted when the contract owner withdraws funds. Includes the amount withdrawn.
- **GoalDefined:** Emitted when the contribution goal is set. Includes the goal amount.

## Solidity Version

This contract uses Solidity version `^0.8.9`.

## Usage

### Deploying the Smart Contract

1. Open this repository in gitpod
2. Inside the project directory, in the terminal type: npm i
3. Open two additional terminals in your VS code
4. In the second terminal type: npx hardhat node
5. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
6. Back in the first terminal, type npm run dev to launch the front-end.
7. Interact with the front-end functionalities.

Author:

@katriceasher
