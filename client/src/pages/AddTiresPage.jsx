import { useTire } from "../context/TireContext";
import { useDeliveryOrder } from "../context/DeliveryOrderContext";
import { useEffect } from "react";

function AddTiresPage() {
  const { getTiresByInspection, tires } = useTire();
  const { addTiresDeliveryOrder } = useDeliveryOrder();

  useEffect(() => {
    getTiresByInspection();
  }, []);


  return (
    <div>AddTiresPage</div>
  )
}

export default AddTiresPage