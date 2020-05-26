// IMPORTING LIBRARIES
import React, { useReducer, useEffect } from 'react';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS

// IMPORTING UTILS

// IMPORTING DEFINES
import { getPainting } from '../js/fetch_functions'

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
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
}

export default ({ item }) => {
  return (
    <></>
  )
}