import React, {useState} from 'react';
import {Button, Modal, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {addCar} from "../actions/CarActions";
import {toast, ToastContainer} from "material-react-toastify";
import 'material-react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
    },
    paperStyle: {
        alignSelf: 'center',
    },
    modalTitleDiv: {
        display: 'flex',
        height: 42,
        backgroundColor: theme.palette.primary.dark,
    },
    modalTitleText: {
        alignSelf: 'center',
        color: 'white',
        marginLeft: 20,
    },
    contentRowDiv: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        height: 200,
        width: 300,
    },
    contentDiv: {
        width: 300,
    },
    rowDiv: {
        justifyContent: 'flex-end',
        marginTop: 64,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    submitButton: {
        marginLeft: 20,
        marginRight: 20,
    },
}));

function AddVehicleModal(props) {
    const dispatch = useDispatch();
    const {
        open, handleModalClose,
    } = props;

    const classes = useStyles();
    const cars = useSelector((state) => state.carReducer.cars);

    const onSubmit = () => {
        let car = cars[cars.length - 1];
        let no = 1
        if(car){
            no = car.no + 1;
        }

        if( make && model && year && price){
            addCar(dispatch, no, make, model, year, price);
            handleModalClose();
        }else {
            let emptyValue = [];
            if(!make.trim()) {
                emptyValue.push("make");
            }
            if(!model.trim()) {
                emptyValue.push("model");
            }
            if(!price.trim()) {
                emptyValue.push("price");
            }
            if(!year.toString().trim()) {
                emptyValue.push("year");
            }
            toast.error(emptyValue.join(', ') + " must be entered.");
        }
    };

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
        >
            <div className={classes.root}>
                <Paper className={classes.paperStyle}>
                    <div className={classes.modalTitleDiv}>
                        <Typography className={classes.modalTitleText} color="inherit" noWrap>
                            Add New Car
                        </Typography>
                    </div>
                    <div className={classes.contentRowDiv}>
                        <div className={classes.contentDiv}>
                            <TextField
                                fullWidth
                                label={"Make"}
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                label={"Model"}
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                label={"Year"}
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                label={"Price"}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div className={classes.rowDiv}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleModalClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={3000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Paper>
            </div>
        </Modal>
    );
}

export default AddVehicleModal;