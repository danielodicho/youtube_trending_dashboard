Describe what data is stored in the database. (Where is the data from, and what attributes and information would be stored?)
According to Variety magazine, “To determine the year’s top-trending videos, YouTube uses a combination of factors including measuring users interactions (number of views, shares, comments and likes). Note that they’re not the most-viewed videos overall for the calendar year”. This dataset includes a wide range of metrics, (ex:video_id, title, publishedAt, channelId, channelTitle, categoryId, trending_date, tags, view_count	, likes, dislikes, comment_count, thumbnail_link, comments_disabled, ratings_disabled, description)
The direct source for the data can be found here. 

What are the basic functions of your web application? (What can users of this website do? Which simple and complex features are there?)
Simple Features:

Filter Data: Users can filter data based on various categories like channelTitle, categoryId, and trending_date.
Sort Data: Users can sort the data in ascending or descending order based on metrics like view_count, likes, and dislikes.
Hide Columns: Users can customize their view by hiding irrelevant columns.
Complex Features:
Date Range Selection: Users can exclude data from certain date ranges to focus on a specific timeframe.
Data Update: Since our dataset updates daily, users have the option to update the dataset to include the most recent trending videos.

What would be a good creative component (function) that can improve the functionality of your application? (What is something cool that you want to include? How are you planning to achieve it?)
Searching by video link. Currently, our database does not have a link to a video but if we are able to webscrape given a YouTube link (potentially even a timestamped YouTube link), we could compare data we scrape to our database and filter to find content by the same YouTuber or in the same day or other similarities between our data and a specific YouTube video.


Project Title
Tracking YouTube Trends
Project Summary:  It should be a 1-2 paragraph description of what your project is.
Our project utilizes the Youtube trending data set that contains several months (and counting) of data on daily trending YouTube videos. We can use the attributes of the data set to possibly determine patterns and formulas to increase the chances of a Youtube video going viral. To help solve this problem, we will need to implement sorting functions, such as searching data by range date or sorting data by view count in ascending or descending order.


Description of an application of your choice. State as clearly as possible what you want to do. What problem do you want to solve, etc.?
We want to be able to browse, filter, and search for data relating to YouTube trends. YouTube trends have always been mysterious in the factors and videos it pushes. This website allows users to do self searches delving into what trends and patterns arise in our data. Users use our website to draw their own conclusions on what factors affect the YouTube trending algorithm.
Usefulness. Explain as clearly as possible why your chosen application is useful.  Make sure to answer the following questions: Are there any similar websites/applications out there?  If so, what are they, and how is yours different?
When searching “YouTube Trend Analysis”, google directs you to their trending page, the dataset we are using, and other various websites telling you what factors affect a trending YouTube video. This makes it difficult to tell what actually affect a trending YouTube video. Our platform would allow users to browse, filter, and search for data relating to YouTube trends. Users will have the freedom to come up with their own patterns/formulas using the functions  we have implemented on the website. Once they start applying their theories to their own videos, they would be able to see which videos become more successful. 


Realness.  Describe what your data is and where you will get it.


We will get our data here. As for what our data is, it is csv file that contains several months (and counting) of data on daily trending YouTube videos. Each region is contained in its own separate file. For example, there will be separate files for US and India. The contents of the file include the video title, channel title, publish time, tags, views, likes and dislikes, description, and comment count. 


Description of the functionality that your website offers. This is where you talk about what the website delivers. Talk about how a user would interact with the application (i.e., things that one could create, delete, update, or search for). Read the requirements for stage 4 to see what other functionalities you want to provide to the users. You should include:
A low-fidelity UI mockup: What do you imagine your final application’s interface might look like? A PowerPoint slide or a pencil sketch on a piece of paper works!
Project work distribution: Who would be responsible for each of the tasks or subtasks?
List of the person responsible for which exact functionalities in section 6. Explain how backend systems will be distributed across members. Be as specific as possible as this could be part of the final peer evaluation metrics.

Certainly! Given the detailed requirements for Stage 4 of your project, which involves building a web application using the YouTube trending dataset, here's how the work could be distributed among the four team members: Vincent, Evan, Daniel, and Yejun.

### Section 6: Work Distribution

#### Frontend Development

1. **User Interface Design**
    - **Responsible**: Vincent
    - **Details**: Vincent will design the basic UI that allows users to interact with the YouTube trending dataset. This includes the layout for CRUD operations and search functionality.

2. **Search Interface**
    - **Responsible**: Evan
    - **Details**: Evan will implement the search box and button that allows users to input a keyword and see the results.

#### Backend Development

1. **Basic CRUD Operations**
    - **Responsible**: Daniel
    - **Details**: Daniel will implement the backend logic for basic CRUD operations (Create, Read, Update, Delete) on the YouTube trending dataset.
  
2. **Search Functionality**
    - **Responsible**: Yejun
    - **Details**: Yejun will implement the backend logic for searching the dataset based on user input.

3. **Advanced Database Program (Transaction + Trigger)**
    - **Responsible**: All Members
    - **Details**: All members will implement an advanced database program involving a transaction with the correct and justified isolation level, at least two advanced queries, and control structures like IF statements.

4. **Trigger for Advanced Database Program**
    - **Responsible**: Yejun
    - **Details**: Yejun will implement a trigger that involves an event, condition (IF statement), and action (Update, Insert, or Delete).

#### Database Management

1. **Database Schema and SQL Implementation**
    - **Responsible**: Daniel and Yejun
    - **Details**: Daniel and Yejun will collaborate to implement the database schema and SQL queries, ensuring they meet the project requirements.

#### Extra Credit and Creative Component

1. **GCP Hosting**
    - **Responsible**: Vincent
    - **Details**: Vincent will host the entire application and database on Google Cloud Platform (GCP) for extra credit.

2. **Creative Component**
    - **Responsible**: Evan
    - **Details**: Evan will develop a creative component, to be decided

#### Documentation and Demo Preparation

1. **Demo Preparation**
    - **Responsible**: All Members
    - **Details**: All team members will prepare for the demo, ensuring that all functionalities are ready to be presented.

2. **Documentation**
    - **Responsible**: All Members
    - **Details**: All team members will contribute to the documentation, explaining their respective functionalities, challenges faced, and future improvements.


