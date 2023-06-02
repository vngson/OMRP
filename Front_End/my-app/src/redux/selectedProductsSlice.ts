import { createSlice } from '@reduxjs/toolkit';


const selectedProductsSlice = createSlice({
    name: "selectedProducts",
    initialState:{
        save:{
            products:null,
            isSaving: false,
            error:false
        },
        delete:{
            products:null,
            isSaving: false,
            error:false
        }

      
    },
    reducers:{
        saveStart: (state) =>{
            state.save.isSaving = true;
        },
        saveSuccess: (state,action) => {
            state.save.isSaving = false;
            state.save.products = action.payload;
            state.save.error = false;
        },
        saveFailed: (state,action) =>{
            state.save.isSaving = false;
            state.save.products = action.payload;
            state.save.error = true;
        },
        deleteSuccess: (state) => {
            state.delete.isSaving = false;
            state.delete.products = null;
            state.delete.error = false;
        },
        deleteFailed: (state) =>{
            state.delete.isSaving = false;
            state.delete.error = true;
        },
        deleteStart: (state) =>{
            state.delete.isSaving = true;
        },
     
    }
});

export const {
    saveStart,
    saveFailed,
    saveSuccess,
    deleteStart,
    deleteSuccess,
    deleteFailed,
} = selectedProductsSlice.actions;

export default selectedProductsSlice.reducer;

