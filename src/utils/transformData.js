// Функция преобразует массив в нужный формат для отправки заказа
export const transformData = (originalArray) => {
  return originalArray.map(item => ({
    id: item.id,
    quantity: item.count
  }));
}