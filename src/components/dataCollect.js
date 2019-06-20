import React from 'react';
import data from "../testData";
export default class dataCollector
{
    // given the id of a user, return an array of messages they've been sent
    static getRelatedMessages(id)
    {
        let messages = data.messages.map((message) =>
        {
            if(message.to === id)
                return message;
        });
        return messages;
    }

    // get array of users from array of ids
    static getUsers(idArray)
    {
        let users = [];
        for(let i = 0; i < idArray.length; i++)
        {
            for(let j = 0; j < data.users.length; j++)
            {
                if(data.users[j].id === idArray[i])
                {
                    users.push({name:data.users[j].name,id:data.users[j].id});
                }
            }
        }

        return users;
    }

    // get array of users from query
    static getUsersByQuery(query)
    {
        console.log(data.users);
        // use word.includes(query);
        let results = [];
        for(let i = 0; i < data.users.length; i++)
        {
            if(data.users[i].name.includes(query))
            {
                results.push({
                    name:data.users[i].name,
                    id:data.users[i].id
                });
            }

        }
        return results;
    }


}