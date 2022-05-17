import React from 'react';

import AngularImg from 'src/assets/images/angular.jpg';
import ReactImg from 'src/assets/images/react.jpg';
import VueImg from 'src/assets/images/vue.jpg';

import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
} from '@coreui/react';

export default function MainCarousel(){

    return (
        <CCarousel controls indicators  className="mb-4">
          <CCarouselItem>
            <img className="d-block w-100" src={ReactImg} alt="slide 1" />
            <CCarouselCaption className="d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <img className="d-block w-100" src={AngularImg} alt="slide 2" />
            <CCarouselCaption className="d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <img className="d-block w-100" src={VueImg} alt="slide 3" />
            <CCarouselCaption className="d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
          </CCarouselItem>
        </CCarousel>
    )
}