// IMPORTING LIBRARIES
import React, { useState } from 'react';
import { Button, TextField, Radio } from '@material-ui/core';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { postPainting } from '../js/fetch_functions';

// IMPORTING DEFINES
import { ERROR_CODE } from '../js/defines';

export default () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [painter, setPainter] = useState('');
  const [desc, setDesc] = useState('');
  const [material, setMaterial] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [price, setPrice] = useState('');
  const [onSale, setOnSale] = useState(false);
  const [res, setRes] = useState(null);

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
    for (let i = 0; i < files.length; i++) {
      formData.append('paintings', files[i]);
    }
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
  }

  const handleOnSale = (event) => {
    setOnSale(onSale ? false : true);
  }

  return (
    <>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label='name'
          variant='outlined'
          value={name}
          margin='normal'
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label='painter'
          variant='outlined'
          value={painter}
          margin='normal'
          onChange={(event) => setPainter(event.target.value)}
        />
        <TextField
          label='description'
          variant='outlined'
          value={desc}
          multiline
          fullWidth
          margin='normal'
          onChange={(event) => setDesc(event.target.value)}
        />
        <TextField
          label='material'
          variant='outlined'
          value={material}
          margin='normal'
          fullWidth
          onChange={(event) => setMaterial(event.target.value)}
        />
        <TextField
          label='width'
          variant='outlined'
          value={width}
          margin='normal'
          onChange={(event) => setWidth(event.target.value)}
        />
        <TextField
          label='height'
          variant='outlined'
          value={height}
          margin='normal'
          onChange={(event) => setHeight(event.target.value)}
        />
        <TextField
          label='price'
          variant='outlined'
          value={price}
          multiline
          fullWidth
          margin='normal'
          onChange={(event) => setPrice(event.target.value)}
        />
				<div>
          <Radio
            checked={onSale}
            onChange={handleOnSale}
          />
          <div>On Sale</div>
          <Radio
            checked={!onSale}
            onChange={handleOnSale}
          />
          <div>Not for Sale</div>
        </div>
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        <Button type="submit">Submit</Button>
        <div>{res}</div>
      </form>
    </>
  )
}