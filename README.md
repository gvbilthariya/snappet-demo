# Classroom Progress Monitoring - A Snappet Demo Project

This application allows teachers to monitor classroom progress with insights into subject levels, learning objectives, and student performance.

## Features

The application includes three main sections:

1. **Subject Level Overview**
   - Displays the following metrics for each subject:
     - **Subject**
     - **Exercises Completed**
     - **Total Learning Objectives**
     - **Average Progress (%)**
     - **Correct Answers (%)**

2. **Learning Objectives Per Subject Level Overview**
   - Provides details for each learning objective per subject, including:
     - **Learning Objective**
     - **Total Exercises**
     - **Average Progress (%)**
     - **Correct Answers (%)**

3. **Student Insights**
   - Consists of:
     - **Overview:**
       - **Student**
       - **Exercises Completed**
       - **Correct Answers**
       - **Average Progress**
     - **Subject and Learning Objectives level Progress Breakdown:**
     - **Strengths and weaknesses**
     - **Recent activities**

## Project Structure

The repository contains the following folders:

- **api**: Backend API based on .NET Core.
- **web-app**: Frontend web application based on Angular.

## Local Setup

To run both the backend and frontend projects locally, follow the steps below:

### Prerequisites

Make sure you have the following installed:

- [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core)
- [Node.js and npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- IDE of your choice

### Running the Backend API
**Visual Studio:**
  - Navigate to the `api\SnappetChallenge.API` directory and open `SnappetChallenge.API.sln`
  - Run the `SnappetChallenge.API` profile (selected by default)
  - Browse: [http://localhost:7016/swagger/index.html](http://localhost:7016/swagger/index.html)

**Visual Studio Code:**
  - Open api folder in visual studio code.
  - Run below commonds in the terminal window from root directory
 ```bash
   root> cd .\api\
   api> dotnet build
   api> cd .\SnappetChallenge.API\
   SnappetChallenge.API> dotnet run
 ```
### Running the Web Application
**Visual Studio Code:**
  - Run below commonds in the terminal window from root directory
 ```bash
   root> cd .\web-app\
   web-app> npm i
   web-app> ng serve
 ```

- Browse: [http://localhost:7016/swagger/index.html](http://localhost:7016/swagger/index.html)

  ![Alt text for the image](/readme-assets/swagger.PNG?raw=true)

  ### Application screenshots
  **Subject Level Overview**
    ![SO](/readme-assets/so.PNG?raw=true)

   **Learning Objective Level Overview**
    ![LO](/readme-assets/lo.PNG?raw=true)

  **Student Insights**
    ![SI](/readme-assets/si.PNG?raw=true)

   **Not Found Page**
    ![Not found](/readme-assets/404.PNG?raw=true)

-----------------------------------------------------------------------------
### Application URL: https://purple-grass-0c75ef900.5.azurestaticapps.net/
-----------------------------------------------------------------------------


  


   


