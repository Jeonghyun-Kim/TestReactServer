// IMPORTING LIBRARIES
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';
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
    // for (let i = 0; i < files.length; i++) {
    //   formData.append('paintings', files[i]);
    // }
    files.forEach((item) => {
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
        <GridContainer>
          <GridItem xs={12} sm={6}>
            <TextInput label="이름" value={name} setValue={setName} />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <TextInput label="작가" value={painter} setValue={setPainter} />
          </GridItem>
          <GridItem xs={12} sm={12}>
            <TextInput label="설명" value={desc} setValue={setDesc} />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <TextInput label="재료" value={material} setValue={setMaterial} />
          </GridItem>
          <GridItem xs={6} sm={3}>
            <TextInput label="가로길이" value={width} setValue={setWidth} />
          </GridItem>
          <GridItem xs={6} sm={3}>
            <TextInput label="세로길이" value={height} setValue={setHeight} />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <TextInput label="가격" value={price} setValue={setPrice} />
          </GridItem>
        </GridContainer>
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
