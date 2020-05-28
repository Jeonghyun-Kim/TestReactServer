// IMPORTING LIBRARIES
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';

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
  currentImage: null,
};

const paintingReducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return initailPaintingState;
    }
    case 'prevImage': {
      return { ...state, currentImage: state.currentImage - 1 };
    }
    case 'nextImage': {
      return { ...state, currentImage: state.currentImage + 1 };
    }
    case 'setPainting': {
      return action.painting;
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

export default function PaintingItem({ itemId }) {
  const [painting, dispatchPainting] = React.useReducer(paintingReducer, initailPaintingState);

  React.useEffect(() => {
    getPainting(itemId, (resJson) => {
      if (resJson.error === ERROR_CODE.OK) {
        const {
          id, painter, name, description, material,
          width, height, price, onSale, numLikes,
        } = resJson.painting;
        const { images } = resJson;

        dispatchPainting({
          type: 'setPainting',
          painting: {
            id,
            painter,
            name,
            description,
            material,
            size: [width, height],
            price,
            onSale,
            numLikes,
            images,
            currentImage: 0,
          },
        });
      } else {
        dispatchPainting({ type: 'reset' });
      }
    });
  }, [itemId]);

  const handleNextImage = () => {
    dispatchPainting({ type: 'nextImage' });
  };

  const handlePrevImage = () => {
    dispatchPainting({ type: 'prevImage' });
  };

  return (
    <>
      {painting.currentImage === null
        ? (
          <h1>Loading...</h1>
        ) : (
          <GridContainer
            container
          >
            <GridItem xs={12} sm={8} align="center">
              <Paper elevation={2}>
                <GridItem xs={12}>
                  <img
                    src={`${STORAGE_URL.PAINTING}/${painting.images[painting.currentImage].url}`}
                    alt="PAINTING"
                    style={{ maxWidth: '100%' }}
                  />
                </GridItem>
                <GridItem xs={12}>
                  {painting.currentImage + 1}
                  {' '}
                  /
                  {' '}
                  {painting.images.length}
                </GridItem>
                <GridItem xs={12}>
                  <Button
                    varinat="contained"
                    onClick={handlePrevImage}
                    disabled={!painting.currentImage}
                  >
                    Prev
                  </Button>
                  <Button
                    varinat="contained"
                    onClick={handleNextImage}
                    disabled={painting.currentImage === (painting.images.length - 1)}
                  >
                    Next
                  </Button>
                </GridItem>
              </Paper>
            </GridItem>
            <GridItem xs={12} sm={4}>
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
            </GridItem>
          </GridContainer>
        )}
    </>
  );
}

PaintingItem.defaultProps = {
  itemId: 1,
};

PaintingItem.propTypes = {
  itemId: PropTypes.number,
};
