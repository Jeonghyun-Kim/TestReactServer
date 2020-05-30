// IMPORTING LIBRARIES
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS
import TextInput from './Input/TextInput';

// IMPORTING UTILS
import { postPainting } from '../js/fetch_functions';

// IMPORTING DEFINES
import { ERROR_CODE } from '../js/defines';

// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   input: {
//     margin: theme.spacing(3),
//   },
// }));

export default () => {
  const [files, setFiles] = React.useState([]);
  const [name, setName] = React.useState('');
  const [painter, setPainter] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [onSale, setOnSale] = React.useState('false');
  const [res, setRes] = React.useState(null);

  // const classes = useStyles();

  const handleSubmit = async (event) => {
    // TODO: Input Validation
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('painter', painter);
    formData.append('description', desc);
    formData.append('material', material);
    formData.append('width', width);
    formData.append('height', height);
    formData.append('price', price);
    formData.append('onSale', onSale);

    Array.from(files).forEach((item) => {
      formData.append('paintings', item);
    });
    postPainting(formData, (resJson) => {
      switch (resJson.error) {
        case ERROR_CODE.AWS_S3_ERROR:
          setRes('AWS S3 Problem');
          break;
        case ERROR_CODE.OK:
          setRes('Uploaded Successfully!');
          break;
        default:
          setRes('Check Your Network!');
          break;
      }
    });
  };

  return (
    <>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextInput label="이름" value={name} setValue={setName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="작가" value={painter} setValue={setPainter} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextInput label="설명" value={desc} setValue={setDesc} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="재료" value={material} setValue={setMaterial} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextInput label="가로길이" value={width} setValue={setWidth} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextInput label="세로길이" value={height} setValue={setHeight} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="가격" value={price} setValue={setPrice} />
          </Grid>
        </Grid>
        <RadioGroup aria-label="gender" name="gender" value={onSale} onChange={(event) => setOnSale(event.target.value)}>
          <FormControlLabel value="true" control={<Radio />} label="On Sale" />
          <FormControlLabel value="false" control={<Radio />} label="Not for Sale" />
        </RadioGroup>
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        <Button type="submit">Submit</Button>
        <div>{res}</div>
      </form>
    </>
  );
};
