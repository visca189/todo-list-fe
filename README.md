<a id="readme-top"></a>

<div align="center">
  <h1>To-Do List Frontend</h1>
  <p>
    A simple and intuitive to-do list application built with React.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#rest-api">REST API</a></li>
  </ol>
</details>

## :star2: About the Project

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
  <img src="./readme-assets/about-the-project.gif?raw=true" alt="screenshot" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

- React
- Sass
- Typescript
- Zod
- Vite
- Vitest
- React Testing Library
- MSW
- Ant Design

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Please refer to `.env.sample` for mock value.

`VITE_TASK_LIST_BACKEND_URL`

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Installation -->

### :gear: Installation

1. Clone the repo
   ```sh
   git clone git@github.com:visca189/todo-list-fe.git
   ```
2. Install YARN packages
   ```sh
   yarn
   ```
3. Create .env file based on .env.sample
4. Start the backend
   - Please refer to the backend repository [here](https://github.com/visca189/todo-list-be)
5. Run the project

   - For development:

   ```sh
   yarn dev
   ```

   - For build:

   ```sh
   yarn build
   yarn preview
   ```

   - For Test:

   ```sh
   yarn test
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Usage -->

## :eyes: Usage

<h4>Add new task</h4>
<img src="./readme-assets/add-task.gif?raw=true" alt="screenshot" />

<h4>Edit task</h4>
<img src="./readme-assets/edit-task.gif?raw=true" alt="screenshot" />

<h4>Delete task</h4>
<img src="./readme-assets/delete-task.gif?raw=true" alt="screenshot" />

<h4>Mark task as done</h4>
<img src="./readme-assets/task-completed.gif?raw=true" alt="screenshot" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>
```
