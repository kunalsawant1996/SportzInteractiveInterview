import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { alpha, AppBar, Box, Card, CardActionArea, CardContent, CardMedia, InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { playerRequest } from '../actions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
      media: {
      height: 300,
    }
}));

export default function PlayerList({filterPlayerList}) {
  const classes = useStyles();

  return (
      <Grid container spacing={3}>
        {
        filterPlayerList && filterPlayerList.length > 0 ?  filterPlayerList?.sort((a,b) => a.PFName.localeCompare(b.PFName)
        ).map((playerDetail) => {
        return (
        <Grid xs={4} key={playerDetail?.Id} item>
        <Card className={classes.root} >
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={playerDetail?.Id ? require(`../../../player-images/${playerDetail?.Id}.jpg`) : ''}
            title={playerDetail?.PFName}
            alt='player'
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              {playerDetail?.PFName}
            </Typography>
            <Typography gutterBottom variant="h5">
              {playerDetail?.SkillDesc}
            </Typography>
            <Typography gutterBottom variant="h6">
              ${playerDetail?.Value}
            </Typography>
            <Grid item xs={12}>
            <Typography gutterBottom variant="h6">
            Upcoming match
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { (playerDetail?.UpComingMatchesList?.[0]?.CCode !== '' || playerDetail?.UpComingMatchesList?.[0]?.VsCCode !== '') 
              ? (<Typography>{playerDetail?.UpComingMatchesList?.[0]?.CCode}   <strong>VS</strong>  {playerDetail?.UpComingMatchesList?.[0]?.VsCCode}</Typography>) : "No match"}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography gutterBottom variant="h6">
            Next match time
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {playerDetail?.UpComingMatchesList?.[0]?.MDate !== '' ? (moment(playerDetail?.UpComingMatchesList?.[0]?.MDate).format('DD-MM-YYYY h:mm:ss a') ): '-'}
            </Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
        </Grid>
        )
    }) :
     (
      <Typography gutterBottom variant="h4">
      No data found
    </Typography>
    )
  }
      </Grid>
  );
}
