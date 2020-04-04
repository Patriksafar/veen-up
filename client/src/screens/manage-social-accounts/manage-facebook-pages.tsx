import React, { useState, useEffect } from "react";
import { Paper } from "../../components/paper";
import { Box, Button, useStore } from "../../components";
import { Avatar } from "../../components/avatar";
import { Redirect } from "@reach/router";
import { routes } from "../../config";
import { postData, getData } from "../../utils";

export const ManageFacebookPages = () => {
  const { fbUserData, veenupToken } = useStore();
  const [listOfPages, setListOfPages] = useState([]);

  // need to compare pages on DB with pages from facebook stored in listOfPages
  getData("http://localhost:5000/social-page/me", veenupToken).then(
    (response) => {
      console.log(response);
      console.log(listOfPages);
    }
  );

  const handleLinkPageClick = (page: any) => {
    console.log(page);
    const { access_token, picture, name } = page;
    if (access_token && picture && name) {
      const payload = {
        token: page.access_token,
        image: page.picture.data.url,
        name: page.name,
        enumType: "Facebook",
      };
      postData("http://localhost:5000/social-page/new", payload, veenupToken)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  };

  // this will load list of users pages where he can admin
  const handleAddPagesButton = () => {
    const pageTokenRequestUrl = `https://graph.facebook.com/${fbUserData?.fbUserId}/accounts?fields=access_token,picture,name,link&access_token=${fbUserData?.token}`;
    fetch(pageTokenRequestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        const { data } = responseData;
        setListOfPages(data);
      });
  };

  return (
    <div>
      <Button onClick={handleAddPagesButton}>Add Facebook page</Button>
      {listOfPages && (
        <Paper>
          {listOfPages.map((page: any) => (
            <Box
              key={page.id}
              startAdornment={
                <Avatar
                  variant="rounded"
                  src={page.picture.data.url}
                  alt={page.name}
                />
              }
              endAdornment={
                <Button
                  onClick={() => {
                    handleLinkPageClick(page);
                  }}
                >
                  Link it
                </Button>
              }
            >
              {page.name}
            </Box>
          ))}
        </Paper>
      )}
    </div>
  );
};
