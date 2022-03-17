import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { alpha, AppBar, Card, CardActionArea, CardContent, CardMedia, InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { playerRequest } from './actions';
import PlayerList from './playerList/playerList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
      media: {
      height: 300,
    },
    search: {
              position: 'relative',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
              },
              marginRight: theme.spacing(2),
              marginLeft: 0,
              width: '100%',
              [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
              },
            },
            searchIcon: {
              padding: theme.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            inputRoot: {
              color: 'inherit',
            },
            inputInput: {
              padding: theme.spacing(1, 1, 1, 0),
              paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
              transition: theme.transitions.create('width'),
              width: '100%',
              [theme.breakpoints.up('md')]: {
                width: '20ch',
              },
            } 
}));

export default function CardList() {
  const classes = useStyles();
    const [filterValue, setFilterValue] = useState(null);
    const [playerList, setPlayerList] = useState([]);
    const [filterPlayerList, setfilterPlayerList] = useState([]);
    const players = useSelector(state => state.playerDetails.playerData);

    const dispatch = useDispatch();
    useLayoutEffect(() => {
      dispatch(playerRequest());
  }, [dispatch]);
    useEffect(() => {
            setPlayerList(players?.playerList)
    }, [players]); 
    const searchPlayer = (e) => {
      setFilterValue(e.target.value)
    }
    useEffect(() => {
      if (filterValue) {
          const updatedProducts = playerList.filter((player) => 
          player?.TName.toLowerCase().includes(filterValue.toLowerCase()) || player?.PFName.toLowerCase().includes(filterValue.toLowerCase())
      )     
      setfilterPlayerList(updatedProducts);
      } else {
        setfilterPlayerList(playerList) 
      }
  }, [filterValue, playerList])

  return (
    <div className={classes.root}>
        <AppBar position="sticky" className={classes.root} spacing={3}>
         <Toolbar>
         <div className={classes.search}>
             <div className={classes.searchIcon}>
               <SearchIcon />
             </div>
             <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchPlayer}
            />
          </div>
        </Toolbar>
    </AppBar>
    <PlayerList filterPlayerList={filterPlayerList}/>
      {/* <Grid container spacing={3}>
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
            image={playerDetail?.Id ? require(`../../player-images/${playerDetail?.Id}.jpg`) : ''}
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
              { (playerDetail?.UpComingMatchesList?.[0]?.CCode !== '' || playerDetail?.UpComingMatchesList?.[0]?.VsCCode !== '') ? (playerDetail?.UpComingMatchesList?.[0]?.CCode + 'vs' + playerDetail?.UpComingMatchesList?.[0]?.VsCCode) : "No match"}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography gutterBottom variant="h6">
            Next match time
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {playerDetail?.UpComingMatchesList?.[0]?.MDate !== '' ? playerDetail?.UpComingMatchesList?.[0]?.MDate : '-'}
            </Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
        </Grid> */}
        {/* )
    }) :
     (
      <Typography gutterBottom variant="h4">
      No data found
    </Typography>
    )
  }
      </Grid> */}
    </div>
  );
}
