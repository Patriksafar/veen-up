import React, { ReactNode } from "react";

import {
  Modal as MaterialModal,
  Fade,
  Backdrop,
  ModalProps,
} from "@material-ui/core";
import { Paper } from "../paper";

import * as classes from "./modal.styles";

type Props = ModalProps & {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ open = false, onClose, children, ...other }: Props) => {
  return (
    <MaterialModal
      className={classes.root}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...other}
    >
      <div className={classes.modalPaper}>
        <Fade in={open}>{children}</Fade>
      </div>
    </MaterialModal>
  );
};
