import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { Card } from "./card";
import classNames from "clsx";

const Container = ({
  products,
  setPtoductImages,
  handleDelete,
  index,
  refresh = false,
  isVideo = false,
}: {
  refresh?: boolean;
  products: string[];
  index: number;
  setPtoductImages: (image: string[]) => void;
  handleDelete: (image: string, index: number) => void;
  isVideo?: boolean;
}) => {
  const [cards, setCards] = useState(products);

  useEffect(() => {
    setCards(products);
  }, [refresh]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const images = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, cards[dragIndex]],
        ],
      });
      setCards(images);
      setPtoductImages(images);
    },
    [cards, setPtoductImages],
  );

  const _handleDelete = useCallback(
    (image: string) => {
      const images = cards.filter((item) => item !== image);
      setCards(images);
      handleDelete(image, index);
    },
    [cards, handleDelete, index],
  );

  const renderCard = useCallback(
    (card: string, index: number) => {
      return (
        <Card
          id={card}
          key={card + index}
          index={index}
          text={card}
          moveCard={moveCard}
          handleDelete={_handleDelete}
          isVideo={isVideo}
        />
      );
    },
    [cards, moveCard, _handleDelete],
  );

  return (
    <div
      className={classNames("mb-4.5 gap-6 grid", {
        "xs:grid-cols-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:lg:grid-cols-3 xl:grid-cols-4":
          isVideo,
        "lg:grid-cols-auto xl:grid-cols-auto grid-cols-4 md:grid-cols-6":
          !isVideo,
      })}
    >
      {cards.map((item, key) => renderCard(item, key))}
    </div>
  );
};

export default Container;
