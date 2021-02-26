const initialState = {
    recipeData: {},
    err: {},
    singleRecipe: {},
    isPending: false ,
    isFulfilled: false,
    isRejected: false,
}

const recipeReducer = (prevState = initialState , action) => {
    switch (action.type) {
        case "GET_ALL_RECIPES_PENDING":
            return{
                ...prevState,
                isPending: true,
                isRejected: false,
                isFulfilled: false,
            }
		case "GET_ALL_RECIPES_REJECTED":
			return{
				...prevState,
				isPending: false,
				isRejected: true,
				err:action.payload,
		};
		case "GET_ALL_RECIPES_FULLFILED":
			return{
				...prevState,
				isPending: false,
				isFulfilled: true,
				recipesData: action.payload.data,
			};
		case "GET_SINGLE_RECIPE_PENDING":
			return{
				...prevState,
				isPending: true,
				isRejected: false,
				isFulfilled: false,
			};
		case "GET_SINGLE_RECIPE_REJECTED":
			return{
				...prevState,
				isPending: false,
				isRejected: true,
				err:action.payload,
			};
		case "GET_SINGLE_RECIPE_FULFILLED":
			return{
				...prevState,
				isPending: false,
				isFulfilled: true,
				singleRecipe: action.payload.data,
			};
		default:
			return{
				...prevState,
			};
    }
};

export default recipeReducer;