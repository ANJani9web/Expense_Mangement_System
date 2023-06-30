import React from 'react'

const Spinner = () => {
  return (
    <>
      {/* <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div> */}

      <div class="d-flex justify-content-center spinner">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner
