import { useSnackbar } from 'notistack';
import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

let VariantType = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info'
};

const InnerSnackbarUtilsConfigurator = (props) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = (props) => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef}>
      {props.children}
    </InnerSnackbarUtilsConfigurator>
  );
};

//sets a default length for all Snack messages
const defaultSnackMessageLength = 1000;

const trimMessage = (msg, length = defaultSnackMessageLength) => {
  return msg.substring(0, length);
};

export default {
  success(msg, options) {
    this.toast(trimMessage(msg), {
      ...options,
      variant: VariantType.success,
      action: (key) => (
        <IconButton
          size="small"
          onClick={() => useSnackbarRef.closeSnackbar(key)}
        >
          <CloseIcon />
        </IconButton>
      )
    });
  },
  warning(msg, options) {
    this.toast(trimMessage(msg), {
      ...options,
      variant: VariantType.warning,
      action: (key) => (
        <IconButton
          size="small"
          onClick={() => useSnackbarRef.closeSnackbar(key)}
        >
          <CloseIcon />
        </IconButton>
      )
    });
  },
  info(msg, options) {
    this.toast(trimMessage(msg), {
      ...options,
      variant: VariantType.info,
      action: (key) => (
        <IconButton
          size="small"
          onClick={() => useSnackbarRef.closeSnackbar(key)}
        >
          <CloseIcon />
        </IconButton>
      )
    });
  },
  error(msg, options) {
    this.toast(trimMessage(msg), {
      ...options,
      variant: VariantType.error,
      action: (key) => (
        <IconButton
          size="small"
          onClick={() => useSnackbarRef.closeSnackbar(key)}
        >
          <CloseIcon />
        </IconButton>
      )
    });
  },
  toast(msg, options) {
    useSnackbarRef.enqueueSnackbar(msg, options);
  }
};
