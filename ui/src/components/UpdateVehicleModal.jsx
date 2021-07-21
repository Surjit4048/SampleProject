import React, {useState} from 'react';
import {Button, Modal, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {setCarSold, updateCar} from "../actions/CarActions";
import {toast, ToastContainer} from "material-react-toastify";

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
        width: 400,
    },
    contentDiv: {
        width: 400,
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

function UpdateVehicleModal(props) {
    const dispatch = useDispatch();
    const {
        open, handleModalClose, id, make, model, year, price,
    } = props;

    const classes = useStyles();

    const onSubmit = () => {
        if( makeVal && modelVal && yearVal && priceVal){
            updateCar(dispatch, id, makeVal, modelVal, yearVal, priceVal);
            handleModalClose();
        }else {
            let emptyValue = [];
            if(!makeVal.trim()) {
                emptyValue.push("make");
            }
            if(!modelVal.trim()) {
                emptyValue.push("model");
            }
            if(!priceVal.trim()) {
                emptyValue.push("price");
            }
            if(!yearVal.toString().trim()) {
                emptyValue.push("year");
            }

            toast.error(emptyValue.join(', ') + " must be entered.");
        }


    };

    const [makeVal, setMake] = useState(make);
    const [modelVal, setModel] = useState(model);
    const [yearVal, setYear] = useState(year);
    const [priceVal, setPrice] = useState(price);

    const markSold = (dispatch, id) => {
        setCarSold(dispatch,id);
        handleModalClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
        >
            <div className={classes.root}>
                <Paper className={classes.paperStyle}>
                    <div className={classes.modalTitleDiv}>
                        <Typography className={classes.modalTitleText} color="inherit" noWrap>
                            Update Car Info
                        </Typography>
                    </div>
                    <div className={classes.contentRowDiv}>
                        <div className={classes.contentDiv}>
                            <TextField
                                fullWidth
                                label={"Make"}
                                value={makeVal}
                                onChange={(e) => setMake(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                label={"Model"}
                                value={modelVal}
                                onChange={(e) => setModel(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                label={"Year"}
                                value={yearVal}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                label={"Price"}
                                value={priceVal}
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
                            color="secondary"
                            className={classes.submitButton}
                            onClick={()=> markSold(dispatch,id)}
                        >
                            Mark Sold
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            onClick={onSubmit}
                        >
                            Update
                        </Button>

                    </div>

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
                </Paper>
            </div>
        </Modal>
    );
}

export default UpdateVehicleModal;