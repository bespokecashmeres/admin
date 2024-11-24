import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./item-types";
import { getAWSImageUrl } from "@/utils/common.utils";
import { DeleteButton } from "../buttons";

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (item: string) => void;
  isVideo?: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  text,
  index,
  moveCard,
  handleDelete,
  isVideo,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className="relative"
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      {isVideo ? (
        <video
          controls
          src={getAWSImageUrl(text)}
          className="object-contain"
          style={{
            width: "300px",
            height: "auto",
          }}
        />
      ) : (
        <img src={getAWSImageUrl(text)} alt={text} className="rounded-md" />
      )}
      <a
        className="bg-p absolute left-2 top-1 cursor-pointer"
        onClick={() => handleDelete(text)} // Add your delete handler here
      >
        <DeleteButton />
      </a>
    </div>
  );
};
