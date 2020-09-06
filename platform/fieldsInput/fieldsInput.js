import React  from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {

    }
}));

export const FieldsInput = props => {
    const classes = useStyles();
    let {field} = props;
    return (
        <div styles={{width:'100%'}}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <TextField
                        id="input-type"
                        label="Outlined"
                        type={field.type}
                        label={field.name}
                        value={field.value}
                        onChange={e => props.handleChangeFields(field.name, e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <IconButton onClick={() => props.removeField(field.name)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}