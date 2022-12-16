import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const styles = {
  "new-release": {
    "--show-sale-price": "none",
    "--text-decoration": "none",
    "--banner-background-color": COLORS.secondary,
    "--banner-color": COLORS.white,
    "--banner-display": "block",
  },
  "on-sale": {
    "--show-sale-price": "inline",
    "--text-decoration": "line-through",
    "--banner-background-color": COLORS.primary,
    "--banner-color": COLORS.white,
    "--banner-display": "block",
  },
  default: {
    "--text-decoration": "none",
    "--show-sale-price": "none",
    "--banner-display": "none",
  },
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  const variant =
    typeof salePrice === "number"
      ? "on-sale"
      : isNewShoe(releaseDate)
      ? "new-release"
      : "default";

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper style={styles[variant]}>
        <ImageWrapper>
          <Banner>{variant === "on-sale" ? "Sale" : "Just released!"}</Banner>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price>{formatPrice(price)}</Price>
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          </PriceWrapper>
        </Row>
        <Spacer size={12} />
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 8px;
  border-radius: 2px;
  font-weight: ${WEIGHTS.bold};
  background-color: var(--banner-background-color);
  color: var(--banner-color);
  display: var(--banner-display);
`;

const ImageWrapper = styled.div`
  position: relative;
  line-height: 0;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  display: var(--show-sale-price);
`;

export default ShoeCard;
