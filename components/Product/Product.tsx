import React from "react";
import Image from "next/image";

import cn from "classnames";

import { declOfNum, priceRu } from "../../helpers/helpers";
import { ProductProps } from "./Product.props";

import { Card, Rating, Tag, Button, Htag, Divider, P, Review, ReviewForm } from "../index";

import styles from "./Product.module.css";

export const Product = ({ className, product, ...props }: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = React.useState<boolean>(false);
  const reviewRef = React.useRef<HTMLDivElement>(null);

  const scroolToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={className} {...props}>
      <Card
        className={cn(styles.product, {
          [styles.productOpened]: isReviewOpened,
        })}
      >
        <div className={styles.logo}>
          <Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} width={70} height={70} />
        </div>
        <Htag className={styles.title} tag="h3">
          {product.title}
        </Htag>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}
          <span className={styles.month}>/мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.tags.map((c) => (
            <Tag className={styles.category} key={c} color="ghost">
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>в кредит</div>
        <div className={styles.rateTitle}>
          <a href="#ref" onClick={scroolToReview}>
            {product.reviewCount} {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
          </a>
        </div>
        <Divider className={styles.hr} />

        <P className={styles.description} size="m">
          {product.description}
        </P>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />

        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          <Button
            className={styles.reviewButton}
            appearance="ghost"
            arrow={isReviewOpened ? "down" : "right"}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>

      <Card
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
        color="blue"
        ref={reviewRef}
      >
        {product.reviews.map((r) => (
          <div key={r._id}>
            <Review review={r} />
            <Divider />
          </div>
        ))}
        <ReviewForm productId={product._id} />
      </Card>
    </div>
  );
};
