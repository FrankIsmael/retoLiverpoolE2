import React from 'react';
import { css } from '@emotion/core';
// First way to import
//import { ClipLoader } from 'react-spinners';
// Another way to import
import BeatLoader from 'react-spinners/BeatLoader';
 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading is-centered'>
        <BeatLoader
          css={override}
          sizeUnit={"px"}
          size={20}
          color={'#C81685'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default AwesomeComponent;