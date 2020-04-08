import React, { useState, useEffect } from "react";
import { Paper } from "../../components/paper";
import { Box, Button, useStore } from "../../components";
import { Avatar } from "../../components/avatar";
import { Redirect } from "@reach/router";
import { routes } from "../../config";
import { postData, getData } from "../../utils";
import { Typography } from "@material-ui/core";

export const ManageFacebookPages = () => {
  const { fbUserData, veenupToken } = useStore();
  const [listOfFacebookPages, setListOfFacebookPages] = useState<[] | null>(
    null
  );
  const [listOfConnectedPages, setListOfConnectedPages] = useState<any>(null);
  const [availablePages, setAvailablePages] = useState<any>(null);

  useEffect(() => {
    if (!listOfConnectedPages)
      // need to compare pages on DB with pages from facebook stored in listOfPages
      getData("http://localhost:5000/social-page/me", veenupToken).then(
        (response) => {
          setListOfConnectedPages(response);
        }
      );
  });

  useEffect(() => {
    const array: any = [];
    if (!listOfFacebookPages) {
      return;
    }

    listOfFacebookPages.map((facebookPage: any, index: number) => {
      const shouldBeRendered =
        listOfConnectedPages &&
        listOfConnectedPages
          .map((e: Record<string, string>) => {
            return e.name;
          })
          .indexOf(facebookPage.name);

      if (shouldBeRendered === -1) {
        array.push(facebookPage);
      } else {
        return;
      }
    });

    setAvailablePages(array);
  }, [listOfConnectedPages, listOfFacebookPages]);

  const handleLinkPageClick = (page: any) => {
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
          if (response.page && listOfConnectedPages) {
            const newPage = response.page;

            setListOfConnectedPages((prevState: any) => [
              ...prevState,
              newPage,
            ]);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // this logic can be moved to BE and compare it with list of connected pages there
  // this will load list of users pages where he can admin
  const handleAddPagesButton = () => {
    const pageTokenRequestUrl = `https://graph.facebook.com/${fbUserData?.fbUserId}/accounts?fields=access_token,picture,name,link&access_token=${fbUserData?.token}`;
    fetch(pageTokenRequestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        const { data } = responseData;
        setListOfFacebookPages(data);
      });
  };

  return (
    <div>
      <Button onClick={handleAddPagesButton}>Add Facebook page</Button>
      {listOfConnectedPages && listOfConnectedPages.length > 0 && (
        <Paper>
          Those are connected:
          {listOfConnectedPages.map((page: any) => (
            <Box
              key={page._id}
              startAdornment={
                <Avatar variant="rounded" src={page.image} alt={page.name} />
              }
              endAdornment={
                <Button
                  onClick={() => {
                    handleLinkPageClick(page);
                  }}
                >
                  Connected
                </Button>
              }
            >
              {page.name}
            </Box>
          ))}
        </Paper>
      )}

      {availablePages && (
        <Paper>
          {availablePages.length > 0 ? (
            availablePages.map((facebookPage: any) => {
              return (
                <Box
                  key={facebookPage.id}
                  startAdornment={
                    <Avatar
                      variant="rounded"
                      src={facebookPage.picture.data.url}
                      alt={facebookPage.name}
                    />
                  }
                  endAdornment={
                    <Button
                      onClick={() => {
                        handleLinkPageClick(facebookPage);
                      }}
                    >
                      Link it
                    </Button>
                  }
                >
                  {facebookPage.name}
                </Box>
              );
            })
          ) : (
            <Typography>No more pages to connect</Typography>
          )}
        </Paper>
      )}
    </div>
  );
};
