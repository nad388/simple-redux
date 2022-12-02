import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  addCustomerAction,
  removeCustomerAction,
} from './store/customerReducer';
import { addCashAction, getCashAction } from './store/cashReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  const addCash = (cash) => {
    dispatch(addCashAction(cash));
  };
  const getCash = (cash) => {
    dispatch(getCashAction(cash));
  };
  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };
  return (
    <div className='App'>
      <div style={{ fontSize: '3rem' }}>Баланс: {cash}</div>
      <div style={{ display: 'flex' }}>
        <button onClick={() => addCash(Number(prompt()))}>
          Пополнить счет
        </button>
        <button onClick={() => getCash(Number(prompt()))}>
          Снять со счета
        </button>
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button onClick={() => dispatch(fetchCustomers())}>
          Получить клиентов из базы данных
        </button>
        <button onClick={() => getCash(Number(prompt()))}>
          Удалить клиента
        </button>
      </div>
      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div
              onClick={() => removeCustomer(customer)}
              style={{
                fontSize: '2rem',
                border: '1px solid black',
                padding: '10px',
                marginTop: '5px',
              }}
              key={customer.name}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '2rem' }}>Клиенты отсутствуют!</div>
      )}
    </div>
  );
}

export default App;
