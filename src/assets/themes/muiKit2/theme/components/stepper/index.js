/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import borders from '../../base/borders';
import boxShadows from '../../base/boxShadows';
// Material Kit 2 React base styles
import colors from '../../base/colors';
import linearGradient from '../../functions/linearGradient';
// Material Kit 2 React helper functions
import pxToRem from '../../functions/pxToRem';

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

export default {
  styleOverrides: {
    root: {
      background: linearGradient(gradients.info.main, gradients.info.state),
      padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
      borderRadius: borderRadius.lg,
      boxShadow: colored.info,

      "&.MuiPaper-root": {
        backgroundColor: transparent.main,
      },
    },
  },
};