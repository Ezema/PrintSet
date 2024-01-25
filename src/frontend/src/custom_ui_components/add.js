import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/**
 * Custom UI component for a floating action button with an add icon.
 */
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

/**
 * Renders the AddButton component.
 * @returns {JSX.Element} The rendered AddButton component.
 */
export default function AddButton() {
  const classes = useStyles();

  return (
    <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
      <AddIcon />
    </Fab>
  );
}