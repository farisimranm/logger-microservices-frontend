import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { insertion } from '../../redux/slices/searchBarSlice';
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function SearchAccordionText(props) {
    const { label, keyname } = props;
    const auditLogs = useSelector((state) => state.auditLog.value);
    const searchBarValue = useSelector((state) => state.searchBar.value);
    const value = searchBarValue[keyname];
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();

    const getValueByKeyPath = (obj, keyname) => {
        const keys = keyname.split('.');
        let value = obj;

        for(let key of keys) {
            if(value && typeof value === 'object') {
                value = value[key];
            }
            else {
                value = undefined;
                break;
            }
        }
        return value;
    };

    const getOptionsFromAuditLogs = () => {
        const optionsSet = new Set(auditLogs.map((auditLog) => getValueByKeyPath(auditLog, keyname)));
        setOptions(Array.from(optionsSet));
    };

    useEffect(() => {
        getOptionsFromAuditLogs();
    }, [auditLogs]);

    return (
        <Autocomplete
            label={label}
            keyname={keyname}
            multiple
            value={value}
            onChange={(e, values) => {
                dispatch(insertion({
                    ...searchBarValue,
                    [keyname]: values
                }));
            }}
            componentsProps={{
                paper: {
                    sx: {
                        width: '100%'
                    }
                }
            }}
            sx={{
                width: 300,
                backgroundColor: '#FFFFFF',
            }}
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        checked={selected}
                        value={option}
                        sx={{
                            color: 'primary.main',
                            [`&, &.${checkboxClasses.checked}`]: {
                                color: 'primary.main',
                              }
                        }}
                    />
                    {option}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder='Search' />
            )}
        />
    );
}

export default SearchAccordionText;

// const options = [
//     'Kret',
//     'Reed',
//     'Apdet',
//     'Dilit',
//     'Eksplod'
// ];