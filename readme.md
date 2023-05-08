# 💬 CRS Web

**CRS Web** is a web-based conversational recommender system that allows AI recommender to recommend movies in a short conversation based on user's preference.

![Demo GIF](readme-img/demo.gif)

## Features
This project aims to provide a easy-to-use interface for users to access the conversational recommender and ask for movie recommendaation. 

The features included in this projects are:

- AI-based conversational recommender for movie recommendation
- Multilingual support for English and Chinese languages
- Movie poster display based on movie keywords
- Simple user login and registration functionality
- Creation of new conversations and viewing of past conversations.

To support certain features, this project uses a modified version of CRSLab to perform tasks and communicate with the web application.

## Screenshots

- Login Page
![Login Page](readme-img/login-page.png)

- Register Page
![Register Page](readme-img/register-page.png)

- Conversation Page
![Conversation Page](readme-img/conversation-page.png)

- Conversation Page with English conversation example
![Conversation Page with English conversation example](readme-img/conversation-english-1.png)
![Conversation Page with English conversation example](readme-img/conversation-english-2.png)

- Conversation Page with Chinese conversation example
![Conversation Page with Chinese conversation example](readme-img/conversation-chinese-1.png)
![Conversation Page with Chinese conversation example](readme-img/conversation-chinese-2.png)
![Conversation Page with Chinese conversation example](readme-img/conversation-chinese-3.png)

## Setup
1. Clone this repo
2. Install Docker, Python, PIP, NodeJS and Conda
3. To run the fronend, start a new terminal and run `cd frontend && yarn && yarn start`
4. To run the backend, start a new terminal and run `cd backend && pipenv install && pipenv run python app.py`
5. To run the MySQL database, start a new terminal and run `cd mysql && docker-compose up`
6. To run the conversational recommender module, follow CRSLab's readme instruction inside the `CRSLab` folder.

## Learn More
This project was built by [Jacky FAN](https://jacky.fan) for the Final Year Project of the Bachelor's Degree in Computing at The Hong Kong Polytechnic University during 2022 and 2023.

The following tech is used in this project: 
- [ReactJS](https://react.dev/) - Frontend framework of this project
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [Flowbite](https://flowbite.com/) - UI components library based on TailwindCSS
- [Python Flask](https://flask.palletsprojects.com/en/2.3.x/) - Backend framework of this project
- [MySQL](https://www.mysql.com/) - Database of this project
- [Docker](https://www.docker.com/) - Container platform for running MySQL
- [CRSLab](https://github.com/RUCAIBox/CRSLab) - Open-source toolkit for building Conversational Recommender System
- [Google Search API](https://developers.google.com/custom-search/) - Google Search for searching movie poster
