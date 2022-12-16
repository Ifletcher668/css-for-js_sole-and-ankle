import React from "react";
import styled from "styled-components/macro";

import SHOES from "../../data";
import ShoeCard from "../ShoeCard";

const ShoeGrid = (props) => {
  return (
    <Wrapper {...props}>
      {SHOES.map((shoe) => (
        <ShoeWrapper key={shoe.slug}>
          <ShoeCard {...shoe} />
        </ShoeWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const ShoeWrapper = styled.div`
  /* control ShoeCard styles here to avoid coupling ShoeCard to ShoeGrid */
  flex: 1 1 340px;
`;

export default ShoeGrid;
