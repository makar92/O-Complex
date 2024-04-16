export const CHANGE_PHONE = "CHANGE_PHONE"
export const CHANGE_SHOPINGCART = "CHANGE_SHOPINGCARD"
export const ADD_GOODS_ITEM = "ADD_GOODS_ITEM"
export const DELETE_GOODS_ITEM = "DELETE_GOODS_ITEM"
export const CLEAR_ORDER = "CLEAR_ORDER"

// Функция для загрузки состояния из Local Storage
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Функция для сохранения состояния в Local Storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
    console.log("error save")
  }
};

const initialState = loadState() || {
  phone: "",
  shopingcart: [],
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_SHOPINGCART: {
      const existingItemIndex = state.shopingcart.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, обновляем количество и цену
        const updatedCartItems = [...state.shopingcart];
        const existingItem = updatedCartItems[existingItemIndex];
        existingItem.count = action.payload.count;
        existingItem.total = action.payload.price * action.payload.count;

        const newState = { ...state, shopingcart: updatedCartItems };
        saveState(newState); // Сохраняем состояние
        return newState;

      } else {
        // Если товара нет в корзине, добавляем новый элемент
        const newState = {
          ...state,
          shopingcart: [
            ...state.shopingcart,
            {
              id: action.payload.id,
              title: action.payload.title,
              count: action.payload.count,
              total: action.payload.price * action.payload.count,
            }
          ]
        };
        saveState(newState); // Сохраняем состояние
        return newState;
      }
    }

    case ADD_GOODS_ITEM: {
      const existingItemIndex = state.shopingcart.findIndex(item => item.title === action.payload.id);
      const updatedCartItems = [...state.shopingcart];

      const newState = { ...state, shopingcart: updatedCartItems };
      saveState(newState); // Сохраняем состояние
      return newState;
    }

    case DELETE_GOODS_ITEM: {
      const existingItemIndex = state.shopingcart.findIndex(item => item.id === action.payload.id);
      const updatedCartItems = [...state.shopingcart];
      updatedCartItems.splice(existingItemIndex, 1);

      const newState = { ...state, shopingcart: updatedCartItems };
      saveState(newState); // Сохраняем состояние
      return newState;
    }

    case CHANGE_PHONE: {
      const newState = { ...state, phone: action.payload.phone };
      saveState(newState); // Сохраняем состояние
      return newState;
    }

    case CLEAR_ORDER: {
      const newState = { ...state, phone: "", shopingcart: [], };
      saveState(newState); // Сохраняем состояние
      return newState;
    }

    default:
      return state
  }
}