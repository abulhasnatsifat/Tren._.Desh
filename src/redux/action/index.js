// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

// For Removing Item Completely from Cart
export const removeFromCart = (product) => {
    return {
        type:"REMOVEITEM",
        payload:product
    }
}