import React from 'react';

import { CFooter } from '@coreui/react';

const AppFooter = () => (
  <CFooter>
    <div>
      <p>
        Copyright © 2022{' '}
        <a className="text-[blue]" href="/">
          Epic Car Rental
        </a>
        . All rights reserved.
      </p>
    </div>
  </CFooter>
)

export default React.memo(AppFooter)
