const defaultState = {
    folderInfo: {},
    fileInfo: {},   
    seeResizebleDivFolder: false,
    seeResizebleDivFile: false,
}

const choosedWorkPlaceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_FILE":
            return { ...state, fileInfo: action.payload }
        case "SET_FOLDER":
            return { ...state, folderInfo: action.payload }
        case "SET_WORKPLACE_FOLDER_SEE_RESIZEBLEDIV":
            return { ...state, seeResizebleDivFolder: action.payload }
        case "SET_WORKPLACE_FILE_SEE_RESIZEBLEDIV":
            return { ...state, seeResizebleDivFile: action.payload }
        default:
            return state
    }
}

export default choosedWorkPlaceReducer;
