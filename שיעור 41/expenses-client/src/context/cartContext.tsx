import { createContext, useState } from "react";

const Ignore = { id: 1, name: "Product 1", price: "$10.00", image: "https://via.placeholder.com/150" };
export type Product = typeof Ignore;

// @ts-ignore
export const CartContext = createContext<{ cart: Product[]; addToCart: Function }>({
    cart: [],
    addToCart: () => {},
});

export function CartProvider(props: { children: any }) {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    return <CartContext.Provider value={{ cart, addToCart }}>{props.children}</CartContext.Provider>;
}
