import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CardActionArea from "@material-ui/core/CardActionArea";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    cardItem:{
        display:'inline',
        alignItems:'center',
        verticalAlign:'middle',
        width:'100%',
    },
    root: {
        maxWidth: 245,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const CardItems = (props)=>{
    const classes = useStyles();

    //
    // const randomKamar = (room)=>{
    //     let i = getRoom.length -1;
    //     for (; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         const temp = getRoom[i];
    //         getRoom[i] = getRoom[j];
    //         getRoom[j] = temp;
    //     }
    //     return room;
    // }
    //
    console.log(props.rooms)
    // const randomRoom = randomKamar(getRoom)
    return (
        // <h1>etst</h1>
        props.rooms.map((item,index)=> {
            let desc = `${item.description}`
            let descriptions = desc.slice(0,25)
            return (
                <Card className={classes.root} key={index}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={item.images[0].url}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.roomName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {descriptions}...
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h4">
                                Rp.{item.harga}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
        )})
    );
}

export default CardItems
