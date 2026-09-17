import { Button, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/slices/cartSlice";
import { roubleSign } from "../../constants/config";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

export const CartButton = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector(cartSelector);
  const totalBooksAmount = cartItems.reduce((sum, item) => item.count + sum, 0);
  const cartIcon = <ShoppingCartIcon size={20} />;
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    isMounted.current = true;
  }, [cartItems]);

  return (
    <Button onClick={() => navigate("/cart")} px="xs">
      <Group>
        <Group gap={1}>
          <Text
            w={totalPrice === 0 ? 30 : 60}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {totalPrice}
          </Text>
          <Text>{roubleSign}</Text>
        </Group>{" "}
        <Text
          style={{
            backgroundColor: "hsla(0, 0%, 100%)",
            height: "25px",
            width: "1px",
          }}
        ></Text>
        <Group gap="xs">
          {cartIcon}
          <Text w={25} style={{ fontVariantNumeric: "tabular-nums" }}>
            {totalBooksAmount}
          </Text>
        </Group>
      </Group>
    </Button>
  );
};
