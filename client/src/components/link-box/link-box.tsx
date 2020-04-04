import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Paper } from "../paper";

import {
  Facebook,
  Twitter,
  Instagram,
  KeyboardArrowRight
} from "@material-ui/icons";
import { Link } from "../link/link";

import * as classes from "./link-box.styles";

const iconsMapped = {
  Facebook: <Facebook color="primary" />,
  Twitter: <Twitter color="primary" />,
  Instagram: <Instagram color="secondary" />
};

type Props = {
  to: string;
  title: string;
  subtitle?: string;
  xsWidth?: 1 | 2 | 3 | 4 | 5 | 6 | boolean | undefined | "auto";
  icon?: keyof typeof iconsMapped;
};

export const LinkBox = ({ to, title, subtitle, xsWidth = 4, icon }: Props) => {
  return (
    <Grid item xs={12} sm={4} classes={{ root: classes.root }}>
      <Link to={to}>
        <Paper smallerPadding>
          <Grid container alignItems="center">
            <Grid container spacing={1} item xs={11}>
              {icon && <Grid item>{iconsMapped[icon]}</Grid>}
              <Grid item>
                <Typography variant="body2" color="textPrimary">
                  {title}
                </Typography>
                {subtitle && (
                  <Typography variant="caption" color="textSecondary">
                    {subtitle}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <KeyboardArrowRight color="action" />
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Grid>
  );
};
