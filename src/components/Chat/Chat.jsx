import React, { Component } from "react";
import { Chat, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-popup';



export default class Mess extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
      }
    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
      }
  render() {
    return (
        <div>
             <Chat
          handleNewUserMessage={this.handleNewUserMessage}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    );
  }
}
