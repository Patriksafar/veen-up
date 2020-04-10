import React, { useState, useEffect } from "react";
import { Paper } from "../../components/paper";
import { Box, Button, useStore, Modal } from "../../components";
import { Avatar } from "../../components/avatar";
import { Redirect } from "@reach/router";
import { routes } from "../../config";
import { postData, getData, deleteData } from "../../utils";
import { Typography, Backdrop, Fade, Grid } from "@material-ui/core";

export const ManageFacebookPages = () => {
  const { veenupToken, fbUserData } = useStore();
  const [listOfFacebookPages, setListOfFacebookPages] = useState<[] | null>(
    null
  );
  const [listOfConnectedPages, setListOfConnectedPages] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const updateAvailablePages = () => {
    const pageTokenRequestUrl = `http://localhost:5000/social-page/facebook`;
    getData(pageTokenRequestUrl, veenupToken).then((responseData) => {
      console.log(responseData);
      const { notConnected } = responseData;
      setListOfFacebookPages(notConnected);
    });
  };

  useEffect(() => {
    if (!listOfConnectedPages)
      // need to compare pages on DB with pages from facebook stored in listOfPages
      getData(
        "http://localhost:5000/social-page/me?type=Facebook",
        veenupToken
      ).then((response) => {
        setListOfConnectedPages(response);
      });
  });

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
          updateAvailablePages();
          if (response.page) {
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
    setOpenModal(true);
    updateAvailablePages();
  };

  const removePage = (page: any) => {
    deleteData(`http://localhost:5000/social-page/${page._id}`, veenupToken)
      .then((response) => {
        setListOfConnectedPages(response.pages);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Grid container spacing={3}>
      {fbUserData && (
        <Grid item xs={12} lg={6}>
          <Paper smallerPadding>
            <Typography variant="subtitle2" gutterBottom>
              Connected Facebook accounts
            </Typography>
            <Box
              startAdornment={<Avatar src={fbUserData.picture || ""}></Avatar>}
            >
              <Typography variant="body1">{fbUserData.name}</Typography>
            </Box>
          </Paper>
        </Grid>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div>
          <Typography variant="h6" gutterBottom>
            Connect pages to VeenUp
          </Typography>
          {listOfFacebookPages && listOfFacebookPages.length > 0 ? (
            listOfFacebookPages.map((facebookPage: any) => {
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
                      smallerPadding
                      onClick={() => {
                        handleLinkPageClick(facebookPage);
                      }}
                    >
                      Connect
                    </Button>
                  }
                >
                  <Typography variant="body1">{facebookPage.name}</Typography>
                </Box>
              );
            })
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              No more pages to connect
            </Typography>
          )}
        </div>
      </Modal>

      <Grid item xs={12} lg={6}>
        <Paper smallerPadding>
          <Box
            startAdornment={
              <Typography variant="subtitle2" gutterBottom>
                Connected pages:
              </Typography>
            }
            endAdornment={
              <Button onClick={handleAddPagesButton} smallerPadding>
                Add
              </Button>
            }
          ></Box>
          {listOfConnectedPages && listOfConnectedPages.length > 0 ? (
            <div>
              {listOfConnectedPages.map((page: any) => (
                <Box
                  key={page._id}
                  startAdornment={
                    <Avatar
                      variant="rounded"
                      src={page.image}
                      alt={page.name}
                    />
                  }
                  endAdornment={
                    <Button
                      smallerPadding
                      color="secondary"
                      onClick={() => {
                        removePage(page);
                      }}
                    >
                      Remove
                    </Button>
                  }
                >
                  <Typography variant="body1">{page.name}</Typography>
                </Box>
              ))}
            </div>
          ) : (
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              There are no connected pages yet
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
