Here's the README content in Markdown format, limited to deployment in a single environment:


# Node.js Application with Jest Testing and GitHub Actions CI/CD Workflow

This guide covers creating a simple Node.js application, writing unit tests with Jest, and setting up a GitHub Actions workflow to automate testing and deployment to Heroku.

## Prerequisites

- Node.js and npm installed

- Git installed

- GitHub account

- Heroku account

## 1. Create a Simple Node.js Application

### Initialize a New Node.js Project

```bash

mkdir my-node-app

cd my-node-app

npm init -y

```

### Install Express.js

```bash

npm install express

```

### Create `app.js`

```javascript

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

  res.send('Hello, World!');

});

if (require.main === module) {

  app.listen(port, () => {

    console.log(`App running on http://localhost:${port}`);

  });

}

module.exports = app;

```

### Add Start Script to `package.json`

```json

"scripts": {

  "start": "node app.js"

}

```

### Test the Application Locally

```bash

npm start

```

Visit `http://localhost:3000` to see "Hello, World!".

## 2. Write Unit Tests with Jest

### Install Jest and Supertest

```bash

npm install --save-dev jest supertest

```

### Update `package.json` to Include Test Script

```json

"scripts": {

  "start": "node app.js",

  "test": "jest"

}

```

### Create Test Directory and Test File

```bash

mkdir test

touch test/app.test.js

```

### Write a Simple Test

```javascript

const request = require('supertest');

const app = require('../app');

describe('GET /', () => {

  it('should return Hello, World!', async () => {

    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);

    expect(res.text).toBe('Hello, World!');

  });

});

```

### Run Tests Locally

```bash

npm test

```

## 3. Set Up GitHub Actions Workflow

### Create Workflow Directory and File

```bash

mkdir -p .github/workflows

touch .github/workflows/deploy.yml

```

### Define the GitHub Actions Workflow

```yaml

name: Node.js CI/CD

on:

  push:

    branches:

      - main

jobs:

  build:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout repository

        uses: actions/checkout@v2

        # This action checks out your repository under $GITHUB_WORKSPACE, so your workflow can access it.

      - name: Set up Node.js

        uses: actions/setup-node@v2

        with:

          node-version: '20'

        # Sets up the Node.js environment for the specified version.

      - name: Install dependencies

        run: npm install

        # Installs the project dependencies.

      - name: Run tests

        run: npm test

        # Runs the Jest tests defined in your project.

      - name: Deploy to Heroku

        if: success()

        env:

          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}

        run: |

          git remote add heroku https://git.heroku.com/<your-heroku-app>.git

          echo "machine api.heroku.com" > ~/.netrc

          echo "  login ${{ secrets.HEROKU_API_KEY }}" >> ~/.netrc

          echo "  password ${{ secrets.HEROKU_API_KEY }}" >> ~/.netrc

          echo "machine git.heroku.com" >> ~/.netrc

          echo "  login ${{ secrets.HEROKU_API_KEY }}" >> ~/.netrc

          echo "  password ${{ secrets.HEROKU_API_KEY }}" >> ~/.netrc

          git push heroku main

        # Deploys the application to the Heroku environment.

```

### Add Heroku API Key to GitHub Secrets

1\. Go to your GitHub repository -> Settings -> Secrets -> New repository secret.

2\. Add a secret named `HEROKU_API_KEY` and paste your Heroku API key.

### Commit and Push Changes

```bash

git add .

git commit -m "Set up Jest for testing and update GitHub Actions workflow"

git push origin main

```

## Summary

- **Node.js Application**: You created a simple Node.js application using Express.js.

- **Unit Testing**: You set up unit testing with Jest and wrote a basic test using Supertest.

- **GitHub Actions**: You created a GitHub Actions workflow to automate testing and deployment to Heroku.

By following this guide, you can ensure that your Node.js application is automatically tested and deployed, maintaining high code quality and reliable deployments.

```
