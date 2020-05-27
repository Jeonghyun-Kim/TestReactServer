// IMPORTING LIBRARIES
import React, { useReducer, useEffect } from 'react';
import { Paper, Button, Grid } from '@material-ui/core';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { getPainting } from '../js/fetch_functions';

// IMPORTING DEFINES
import { ERROR_CODE, STORAGE_URL } from '../js/defines';

const initailPaintingState = {
  id: null,
  painter: '',
  name: '',
  description: '',
  material: '',
  size: [0, 0],
  price: null,
  onSale: false,
  numLikes: 0,
  images: [],
  currentImage: null
}

const paintingReducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return initailPaintingState;
    }
    case 'prevImage': {
      return { ...state, currentImage: state.currentImage - 1 }
    }
    case 'nextImage': {
      return { ...state, currentImage: state.currentImage + 1 }
    }
    case 'setPainting': {
      return action.painting;
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
}

export default ({ itemId }) => {
  const [painting, dispatchPainting] = useReducer(paintingReducer, initailPaintingState);

  useEffect(() => {
    getPainting(itemId, (resJson) => {
      if (resJson.error === ERROR_CODE.OK) {
        let { id, painter, name, description, material,
          width, height, price, onSale, numLikes } = resJson.painting;
        let { images } = resJson;

        dispatchPainting({ type: 'setPainting', painting: { id, painter, name, description, material, size: [width, height], 
          price, onSale, numLikes, images, currentImage: 0 } });
      } else {
        
        dispatchPainting({type: 'reset'});
      }
    });
  }, [itemId])

  const handleNextImage = () => {
    dispatchPainting({ type: 'nextImage' });
  }

  const handlePrevImage = () => {
    dispatchPainting({ type: 'prevImage' });
  }

  const PaintingImage = ({ url }) => {
    return (
      <img
        src={`${STORAGE_URL.PAINTING}/${painting.images[painting.currentImage].url}`}
        alt='PAINTING'
        style={{ maxWidth: '100%' }}
      />
    )
  }

  return (
    <>
    {painting.currentImage === null
    ? (
      <h1>Loading...</h1>
    ) : (
      <Grid
        container
      >
        <Grid item xs={12} sm={8} align='center'>
          <Paper elevation={2}>
            <Grid item xs={12}>
              <PaintingImage url={`${STORAGE_URL.PAINTING}/${painting.images[painting.currentImage].url}`} />
            </Grid>
            <Grid item xs={12}>
              {painting.currentImage + 1} / {painting.images.length}
            </Grid>
            <Grid item xs={12}>
              <Button
                varinat='contained'
                onClick={handlePrevImage}
                disabled={!painting.currentImage}
              >
                Prev
              </Button>
              <Button
                varinat='contained'
                onClick={handleNextImage}
                disabled={painting.currentImage === (painting.images.length - 1)}
              >
                Next
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2}>
            <div>작가: {painting.painter}</div>
            <div>작품명: {painting.name}</div>
            <div>설명: {painting.description}</div>
            <div>재료: {painting.material}</div>
            <div>크기: {painting.size[0]} x {painting.size[1]} (단위: cm)</div>
            <div>판매 여부: {painting.onSale ? '판매중' : '판매중이지 않음'}</div>
            <div>가격: {painting.price}</div>
            <div>좋아요 수: {painting.numLikes}</div>
          </Paper>
        </Grid>
      </Grid>
    )}
    </>
  )
}