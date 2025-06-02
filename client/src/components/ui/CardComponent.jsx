// CardComponent.jsx
import { Card, CardBody } from "@heroui/react";

function CardComponent({ children }) {
  return (
    <Card isBlurred className="w-full max-w-3xl mx-auto shadow-lg dark border-none bg-background/60 dark:bg-default-100/50 ">
      <CardBody className="p-6 space-y-4">{children}</CardBody>
    </Card>
  );
}

export default CardComponent;
