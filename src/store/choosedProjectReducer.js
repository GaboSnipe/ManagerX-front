const defaultState = {
    projectInfo: {},
    seeResizebleDiv: false,
    selectedRowId: null,
}

const choosedProjectReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_PROJECT":
            return { ...state, projectInfo: action.payload }
        case "SET_PROJECT_SEE_RESIZEBLEDIV":
            return { ...state, seeResizebleDiv: action.payload }
        case "SET_SELECTED_ROW_ID":
            return { ...state, selectedRowId: action.payload }
        default:
            return state
    }
}

export default choosedProjectReducer;
