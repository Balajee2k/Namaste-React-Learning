import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem:(state,action)=>{
            //mutating the state here
            state.items.push(action.payload);
        },
        removeItem:(state,action)=>{
            state.items=state.items.filter(item=>item.id!==action.payload.id);
        },
        //Here original state :{items:["pizza"]}
        clearCart:(state)=>{
            state.items.length = 0;
            /*
            instead of you can also return with empty object like this
            return { items: [] }; ->This new obj will be replaced inside originalState={}
            */
        }
    }    

})

//export action and reducer

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
