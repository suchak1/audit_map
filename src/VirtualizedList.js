import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

const lines = [
  "POLICY.ACCESSED => POLICY.REVOKED",
  "POLICY.OPENED => POLICY.REVOKED",
  "POLICY.READ_ACCESS => POLICY.REVOKED",
  "POLICY.WRITE_ACCESS => POLICY.REVOKED",
  "POLICY.FETCH => POLICY.REVOKED"]

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Ubuntu Mono',
    width: '100%',
    height: 400,
    maxWidth: 360,
  },
  row: {
    fontFamily: 'Ubuntu Mono',
  },
}));

function Row(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText  primary={`${lines[index]}`} style={{fontFamily: 'Courier'}} />
    </ListItem>
  );
}

export default function VirtualizedList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={400} width={window.innerWidth} itemSize={46} itemCount={200}>
        {Row}
      </FixedSizeList>
    </div>
  );
}
