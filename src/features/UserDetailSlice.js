import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

// create action
export const createUser = createAsyncThunk("createUser", async (data) => {
    const response = await fetch("https://6558ac87e93ca47020a9955a.mockapi.io/crud", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return isRejectedWithValue(error);
    }
});

// Read action
export const editUser = createAsyncThunk("editUser", async (args, { rejectedWithValue }) => {
    const response = await fetch("https://6558ac87e93ca47020a9955a.mockapi.io/crud");

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectedWithValue(error);
    }
})


// Delete action / User Record
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectedWithValue }) => {
    const response = await fetch(`https://6558ac87e93ca47020a9955a.mockapi.io/crud/${id}`, { method: 'DELETE' });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectedWithValue(error);
    }
})

// Update User Data
export const updateUSer = createAsyncThunk("updateUSer", async (data) => {
    const response = await fetch(`https://6558ac87e93ca47020a9955a.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return isRejectedWithValue(error);
    }
});


export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        userData: [],
        loading: false,
        error: null,
        searchData: [],
        editUserModal: false,
        getUserModalId: [],
    },

    // Handle Search Bar and Modal Popup
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;
        },
        setEditUserModal(state, action) {
            state.editUserModal = action.payload;
        },
        setGetUserModalId(state, action) {
            state.getUserModalId = action.payload;
        }
    },

    // Handle promise and store data using action.payload
    extraReducers: {
        // Create User
        [createUser.pending]: (state, action) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData.push(action.payload)
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
        },
        // Get data submit data
        [editUser.pending]: (state) => {
            state.loading = true;
        },
        [editUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData = action.payload
        },
        [editUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Delete user
        [deleteUser.pending]: (state) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            // Find id
            const { id } = action.payload;
            if (id) {
                // delete matched record and add remaining data in state.userData
                state.userData = state.userData.filter((element) => element.id !== id)
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update User
        [updateUSer.pending]: (state) => {
            state.loading = true;
        },
        [updateUSer.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData = state.userData.map((element) => (
                element.id === action.payload.id ? action.payload : element
            ));
        },
        [updateUSer.rejected]: (state, action) => {
            state.loading = false;
        }
    },
});

export default userDetail.reducer;
export const { searchUser, setEditUserModal, setGetUserModalId } = userDetail.actions;