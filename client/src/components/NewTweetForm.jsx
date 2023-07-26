import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const NewTweetForm = ({ tweetService, onError, onCreated }) => {
  const [tweet, setTweet] = useState('');

  const { user } = useAuth();

  // console.log('user');
  // console.log(user);

  const onSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet, user.username)
      .then((created) => {
        setTweet('');
        // onCreated(created); created의 생성은 이제 소켓에서 하고있음
      })
      .catch(onError);
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <form className='tweet-form' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Edit your tweet'
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className='form-input tweet-input'
      />
      <button type='submit' className='form-btn'>
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;
