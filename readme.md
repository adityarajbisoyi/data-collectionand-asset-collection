# Data Collection and Asset Collection

A JavaScript-based project focused on efficient data collection and asset management. This repository provides scripts and utilities for gathering, organizing, and maintaining datasets and digital assets, making it useful for automation, analytics, or resource management tasks.

## Features

- **Data Extraction**: Automated extraction of structured data from web pages into CSV format
- **Asset Management**: Download and organize digital assets (images) from web sources
- **CSV Processing**: Built-in support for parsing and generating CSV files using PapaParse
- **Automation Ready**: Cypress-based test framework for reliable, automated data collection workflows

## Quick Start

### Prerequisites
```bash
npm install cypress papaparse
```

### Usage
```bash
npx cypress open
```

## Project Structure

- `cypress/e2e/downloadableData.cy.js` - Data extraction and CSV generation scripts
- `cypress/e2e/downloadImage.cy.js` - Image asset downloading utilities
- `cypress.config.js` - Configuration with custom tasks for asset management