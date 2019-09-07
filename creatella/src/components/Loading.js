
//import what you want from material-UI
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// use load component from Material-UI as it is
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function Loading() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    function tick() {
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }
    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{margin:"50%",marginTop:"20%"}}>
      <CircularProgress
        className={classes.progress}
        variant="determinate"
        value={progress}
        color="secondary"/>
    </div>
  );
}