<div align= "center">
<hr>
</div>

<div align="center">

<h2> Light-it Challenge ⚡  Patient registration</h2>

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## 💡 Overview

An API for patient registration that collects the following information: name, email address, phone number, and a photo of the document. Key features include:

## ✨ Features

- **💾 Storage:** MySQL Database.
- **🌍 Containerization:** Docker.
- **📬 Notification e-mail:** Send automatic email once registered with option to scale to other types of notification using Design Patterns.
- **📄 Pagination & Analytics:** Navigate large lists and gain insights with charts and dashboards.
- **🎯 Production Optimization:** Built for speed and reliability in production environments.
- **🔧 Customization:** Tailor settings and configurations to your needs.
- **📱 Responsive Design:** Access on any device with adaptive design.

Whether you're a solo developer or part of a large team, FixHub is the perfect tool for tracking and resolving issues with ease.🐞

## 👩‍💻 Tech Stack

- **Next.js**: A React framework for building server-side rendering and static web applications.
- **Auth.js**: Free and open source Authentication for the Web.
- **Hono**: A lightweight web framework for building server-side applications with TypeScript.
- **Drizzle ORM**: TypeScript-first ORM for type-safe database access.
- **React Query**: Data-fetching library for managing server-state in React applications.
- **Npm Package**: A fast JavaScript runtime that includes a package manager, task runner, and more.

## 📖 Sources and external API's

- [NASA](https://www.nasa.gov) for space exploration and research
- [National Geographic](https://www.nationalgeographic.com) for nature and science articles
- [Stack Overflow](https://stackoverflow.com) for programming questions and answers
- [Wikipedia](https://www.wikipedia.org) for a wide range of information on various topics

## 📦 Getting Started

To get a local copy of this project up and running, follow these steps.

### 🚀 Prerequisites

- **Node.js** (v16.x or higher) and **npm** or **yarn**.
- **Npm** If you prefer using npm for package management and running scripts.
- **PostgreSQL** (or another supported SQL database).

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sumonta056/readme-template.git
   cd readme-template
   ```

2. **Install dependencies:**

   Using Npm:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   #database
   DATABASE_URL=your_database_url
   DATABASE_SECRET=your_database_secret
   DRIZZLE_DATABASE_URL=your_database_url_for_drizzle

   #auth
   AUTH_SECRET=any_random_secret
   ```

4. **Run database migrations:**

   Ensure your database is running and then run:

   ```bash
   npm run drizzle-kit migrate
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

## 📖 Usage

### ✔ Running the Website

- **Development mode:** `npm run dev`, `yarn dev`, or `bun dev`.
- **Production mode:** `npm run build && npm start`, `yarn build && yarn start`, or `bun run build && bun start`.

> Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### 📃 API Documentation

The API documentation for this application is available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs). It details all endpoints and their usage.

## 🧪 Test Cases

1. **Invalid Input.**
   ![alt text](image.png)
2. **Register patient successfully.**
   ![alt text](image-1.png)
3. **Register patient successfully and email confirmation sent.**
   ![alt text](image-2.png)
