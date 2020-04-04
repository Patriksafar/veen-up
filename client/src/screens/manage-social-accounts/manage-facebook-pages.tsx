import React, { useState, useEffect } from "react";
import { Paper } from "../../components/paper";
import { Box, Button, useStore } from "../../components";
import { Avatar } from "../../components/avatar";
import { Redirect } from "@reach/router";
import { routes } from "../../config";

export const ManageFacebookPages = () => {
  const { fbUserData } = useStore();
  const [listOfPages, setListOfPages] = useState([]);

  const handleLinkPageClick = (page: any) => {
    console.log(page);
  };

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
