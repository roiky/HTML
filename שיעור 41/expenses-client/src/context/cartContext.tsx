import { createContext, useState } from "react";

const Ignore = { id: 1, name: "Product 1", price: "$10.00", image: "https://via.placeholder.com/150" }
export type Produt = typeof Ignore
// @ts-ignore
export const CartContext = createContext<{ cart: number[]; addToCart: Function }>({ cart: [], addToCart: () => {} });

export function CartProvider(props: { children: any }) {
    const [cart, setCart] = useState<number[]>([]);

    const addToCart = (id: number) => {
        setCart([...cart, id]);
    };

    return <CartContext.Provider value={{ cart, addToCart }}>{props.children}</CartContext.Provider>;
}

{
    /* <ThemeProvider/> */
}
{
    /* <ThemeProvider>{}</ThemeProvider> */
}
