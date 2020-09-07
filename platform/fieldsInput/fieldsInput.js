import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { JsonEditor } from '../../app/components/JsonEditor/jsonEditor';

const useStyles = makeStyles(theme => ({
  container: { width: '100%', marginTop: '5px' },
  column1: { width: '10%' },
  column2: { width: '80%' },
  column3: { width: '10%' },
  fieldInput: { width: '100%' }
}));

function renderFieldInput(field, props) {
  const classes = useStyles();
  return (
    <>
      {field.type === 'json' ? (
        <JsonEditor
          value={field.value}
          onChange={e => props.handleChangeFields(field.name, e)}
        />
      ) : (
        <TextField
          id="input-type"
          label="Outlined"
          type={field.type}
          label={field.name}
          value={field.value}
          onChange={e => props.handleChangeFields(field.name, e.target.value)}
          className={classes.fieldInput}
        />
      )}
    </>
  );
}

export const FieldsInput = props => {
  const classes = useStyles();
  let { field } = props;
  return (
    <div className={classes.container}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item className={classes.column1} />
        <Grid item className={classes.column2}>
          {renderFieldInput(field, props)}
        </Grid>

        <Grid item className={classes.column3}>
          <IconButton onClick={() => props.removeField(field.name)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
