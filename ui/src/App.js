import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
    Button, IconButton,
    InputAdornment, Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {Bar} from "react-chartjs-2";
import {Delete, Edit} from "@material-ui/icons";
import AddVehicleModal from "./components/AddVehicleModal";
import {useDispatch, useSelector} from "react-redux";
import {deleteCar, getAllCars} from "./actions/CarActions";
import UpdateVehicleModal from "./components/UpdateVehicleModal";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    searchDiv: {
        backgroundColor: "white",
        width: 200,
        height: 30,
        borderRadius: 4,
    },
    flexSpace: {
        display: "flex",
        flex: 1,
    },
    barsDiv: {
        width: 150,
        height: 150,
    },
    table: {
        minWidth: 650,
    },
}));


export default function App() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showAddVehicle, setShowAddVehicle] = useState(false);
    const [search, setSearch] = useState("");
    const [showUpdateVehicle, setShowUpdateVehicle] = useState({});

    const showHideModalUpdate = useCallback((isOpen, id, make, model, year, price) => {
        setShowUpdateVehicle({isOpen, id, make, model, year, price})
    }, []);

    const cars = useSelector((state) => state.carReducer.cars);
    useEffect(() => {
        getAllCars(dispatch);
    }, [dispatch]);

    const getBarData = () => {
        let sold = cars.filter((car) => car.status === "Sold").length;
        let live = cars.filter((car) => car.status === "Live").length;
        return {
            labels: ['LIVE', 'SOLD'],
            datasets: [
                {
                    label: 'Cars',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    barThickness: 20,
                    animation: false,
                    barPercentage: 1,
                    order: 1,
                    data: [live, sold, cars.length]
                }
            ],
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Button onClick={() => setShowAddVehicle(true)} variant="contained" color="secondary">
                        Add New Vehicle
                    </Button>
                    <div className={classes.flexSpace}/>
                    <div className={classes.searchDiv}>
                        <TextField
                            id="input-with-icon-textfield"
                            placeholder={"Search"}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <Divider/>
                <ListItem selected button key={"Inventory"}>
                    <ListItemText primary={"Inventory"}/>
                </ListItem>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>

                <div className={classes.barsDiv}>
                    <Bar
                        data={getBarData()}
                        options={{
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
                <br/><br/><br/>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell align="right">Make</TableCell>
                                <TableCell align="right">Model</TableCell>
                                <TableCell align="right">Year</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cars.filter((car => car.no.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                                    car.make.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                                    car.model.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                                    car.year.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
                            )).map((row) => (
                                <TableRow key={row.no}>
                                    <TableCell component="th" scope="row">
                                        {row.no}
                                    </TableCell>
                                    <TableCell align="right">{row.make}</TableCell>
                                    <TableCell align="right">{row.model}</TableCell>
                                    <TableCell align="right">{row.year}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => showHideModalUpdate(true, row._id, row.make, row.model, row.year, row.price)}
                                            aria-label="Edit" size="small">
                                            <Edit fontSize="inherit"/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => deleteCar(dispatch, row._id)}
                                            aria-label="Delete" size="small">
                                            <Delete fontSize="inherit"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    showAddVehicle && (
                        <AddVehicleModal
                            open={showAddVehicle}
                            handleModalClose={() => setShowAddVehicle(false)}
                        />
                    )

                }
                {
                    showUpdateVehicle.isOpen && (
                        <UpdateVehicleModal
                            id={showUpdateVehicle.id}
                            make={showUpdateVehicle.make}
                            model={showUpdateVehicle.model}
                            year={showUpdateVehicle.year}
                            price={showUpdateVehicle.price}
                            open={showUpdateVehicle.isOpen}
                            handleModalClose={() => showHideModalUpdate(false, "", "", "", "", "")}
                        />
                    )
                }
            </main>
        </div>
    );
}
