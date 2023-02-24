import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter  className='text-center text-lg-left  p-0'>
      <div className='text-center p-3' style={{backgroundColor: "#131316"}}>
        <a className='animatedLine' style={{textDecoration:'none'}}>
          &copy; {new Date().getFullYear()} DataLake:{' '}
          Made by Jonathan Lindqvist, Kasper Linström, Nonno Rydgren, Viktor Lindström Söraas
        </a>
      </div>
    </MDBFooter>
  );
}
