import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SubjectIcon from '@material-ui/icons/Subject';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
// });

const cardStyle = {
    display:"flex",
    flexDirection:"column",
    padding: "16px",
    fontFamily:"sans-serif",
    ':hover': {
      color: 'grey'
    }
  };

export default function MediaCard(props) {
  // const classes = useStyles();

  return (
    <div style={cardStyle}>
            <div><h3>{props.title}</h3></div>
            <div>{props.description}</div>
        <div>
            <IconButton size="small">
              <SubjectIcon/>
            </IconButton>
        </div>
    </div>
  );
}
