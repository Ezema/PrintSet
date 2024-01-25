import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, CardHeader, Button } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));

const data = {
  name: [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ],
  id: [1, 2, 3, 4]
};

export default function AltCard() {
  const classes = useStyles();

  function addPaper(e) {
    data.name.push({ name: "otroObject" });
    let member = data.id[data.id.length - 1];
    let result = member + 1;
    data.id.push(result);

    setCustoman((customan) =>
      data.id.map((elem) => (
        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
          {data.name.map((elem) => (
            <Grid item xs={2} key={data.name.indexOf(elem)}>
              <Card>
                <CardHeader title={`quarter : ${elem.quarter}`} subheader={`earnings : ${elem.earnings}`} />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Hello World
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ))
    );
  }

  const [customan, setCustoman] = React.useState(
    data.id.map((elem) => (
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
        {data.name.map((elem) => (
          <Grid item xs={2} key={data.name.indexOf(elem)}>
            <Card>
              <CardHeader title={`quarter : ${elem.quarter}`} subheader={`earnings : ${elem.earnings}`} />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Hello World
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ))
  );

  return (
    <div className={classes.root}>
      <Button onClick={addPaper}>click here</Button>
      {customan}
    </div>
  );
}
