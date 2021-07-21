import {GET_CARS,} from '../actions/CarActions';

const initialState = {
    cars: [],
};

export default function reducer(state = initialState, action) {
    if (action.type === GET_CARS) {
        return {...action.payload};
    }
    return {...state};
}
