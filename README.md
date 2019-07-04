# Messenger APP Client

## Purpose

Messenger App is a full stack application designed for sending private messages
between two users that requires authentication. This repository is for the react client side.

## Software

- React js library
- Javascript

## Main Pages

### Login/Signup

Pictured: the signup/login page with none of the text areas filled. 
	![Login/Signup page](https://github.com/BrittniLudington/messenger/blob/master/readmeImg/login.PNG)

To sign up for an account:
1.) Click the sign up button at the bottom
2.) Input preferred username
3.) Input preferred password
4.) Click submit

NOTE: Currently the page will not automatically take the new user to their page upon signup. The user must log in using their new name and password.

### My Page

Pictured: An example user page.
	![User page](https://github.com/BrittniLudington/messenger/blob/master/readmeImg/userpage.PNG)

The user's page displays the following:

- The user's name at the top (in this case: "test")
- The user's messages
- Table of buttons to filter the inbox

### Search Results Page

Pictured: Search result when the search bar is left blank
	![Search page](https://github.com/BrittniLudington/messenger/blob/master/readmeImg/searchall.PNG)

To use the search feature:

1.) Login or create your account
2.) In the search bar on the top center of the page, type in a search query.
3.) The app will bring back users whose names possess the query in their name



## Getting Started

1.) Follow the steps for creating an account (or two)
2.) New accounts will not have any messages in their inbox
3.) Use the search box to find other users
4.) Upon finding a user, click the send message option to send them a personal message.
5.) A message must contain the following:
-  A header
-  A message
6.) Send them the completed message
7.) Respond to other users who send messages to you

## Bugs

The following are currently known bugs. Under each one is a temporary solution until the bug is resolved.

- Upon registering an account, the login/signup page will not automatically take the user to their page.
-  Solution: use newly made name and password to login

- Search query is buggy, it won't always bring up existing accounts despite having the query
-  Solution: leave the search bar blank to see all the users

- Users can send messages to themselves
-  Solution: don't send messages to yourself

- Users will still see messages they sent others. This shows up as a message From: You, this is not visually different enough from other messages
-  Solution: look at where each message is from carefully