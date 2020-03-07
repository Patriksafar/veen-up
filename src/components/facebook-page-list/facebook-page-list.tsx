import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useStore } from '../store';

export const FacebookPageList = () => {
  const { listOfPages, setListOfPages, fbUserData } = useStore();

  const handleAddPost = () => {
    const pageId = listOfPages[1].id
    const pageToken = listOfPages[1].access_token
    const pageTokenRequestUrl = `https://graph.facebook.com/v6.0/${pageId}/feed?message=Hello Fan!&access_token=${pageToken}`
    fetch(pageTokenRequestUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.id) {
          alert('přidáno!!!')
        } else if (responseData.error.error_user_msg) {
          alert(responseData.error.error_user_msg)
        }
      });
  };

  const getListOfAccountPages = () => {
    if (fbUserData.isLoggedIn) {
      const pageTokenRequestUrl = `https://graph.facebook.com/${fbUserData.userID}/accounts?fields=access_token,picture,name&access_token=${fbUserData.token}`;
      fetch(pageTokenRequestUrl)
        .then((response) => response.json())
        .then((responseData) => {
          const { data } = responseData;
          setListOfPages(data)
        });
    }
  };
  return (
    <div>
      {fbUserData.name}
      {fbUserData.picture && <Avatar src={fbUserData.picture} alt={fbUserData.name} />}
      {!listOfPages && (
        <Button onClick={getListOfAccountPages} variant="contained" color="primary">
          add pages
        </Button>
      )}
      {listOfPages && (
        <div>
          {listOfPages.map((page: any) => (
            <Paper elevation={3} key={page.id}>
              <h5>{page.name}</h5>
              {page.id}
              <Avatar src={page.picture.data.url} variant="rounded" alt={page.name} />
            </Paper>
          ))}
          <Button onClick={handleAddPost} variant="contained" color="primary"> Post a "Hello world"</Button>
        </div>
      )}
    </div>
  );
};
