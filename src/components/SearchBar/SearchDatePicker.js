import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { insertion } from '../../redux/slices/searchBarSlice';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';

function SearchDatePicker(props) {
    const { label, keyname } = props;
    const searchBarValue = useSelector((state) => state.searchBar.value);
    const dateTimeValue = searchBarValue[keyname];
    const dateTimeMoment = dateTimeValue !== '' ? moment(dateTimeValue) : undefined;
    const dispatch = useDispatch();

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
                label={label}
                format="DD/MM/YYYY"
                value={dateTimeMoment}
                onChange={(value) => {
                    dispatch(insertion({
                        ...searchBarValue,
                        [keyname]: value.format('YYYY-MM-DDTHH:mm:ssZ')
                    }));
                }}
                slotProps={{
                    textField: {
                        sx: {
                            backgroundColor: "#D9D9D9",
                            label: {
                                color: '#000000',
                            },
                            '& label.Mui-focused': {
                                color: '#26890D',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#26890D',
                            },
                            '& .MuiOutlinedInput-root': {
                                
                                '&:hover fieldset': {
                                borderColor: '#000000',
                                },
                                '&.Mui-focused fieldset': {
                                borderColor: '#26890D',
                                },
                            },
                        }
                    }
                }}
            />
        </LocalizationProvider>
    );
}

export default SearchDatePicker;