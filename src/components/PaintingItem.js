// IMPORTING LIBRARIES
import React, { useReducer, useEffect } from 'react';
import { Button } from '@material-ui/core';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { getPainting } from '../js/fetch_functions'

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
          width, height, price, onSale, numLikes, images } = resJson;

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

  return (
    <>
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
    {painting.currentImage === null
    ? (
      <h1>Loading...</h1>
    ) : (
      <img
        src={`${STORAGE_URL.PAINTING}/${painting.images[painting.currentImage].url}`}
        alt=''
      />
    )}
    </>
  )
}