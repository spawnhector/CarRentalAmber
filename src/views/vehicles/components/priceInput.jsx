import { useState } from 'react';

import {
  Input,
  Select,
} from 'antd';

export const PriceInput = ({ value = {}, onChange ,noName}) => {
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState('dollar');
  
    const triggerChange = (changedValue) => {
        switch (noName) {
            case true:
                onChange?.(prev=>{
                    return {
                        ...prev,
                        price: changedValue
                    }
                });
                break;
            case false:
                onChange?.({
                  price,
                  currency,
                  ...value,
                  ...changedValue,
                });
                break;
        }
    };
  
    const onPriceChange = (e) => {
      const newPrice = parseInt(e.target.value || '0', 10);
  
      if (Number.isNaN(price)) {
        return;
      }
  
      if (!('price' in value)) {
        setPrice(newPrice);
      }
  
      triggerChange({
        price: newPrice,
      });
    };
  
    const onCurrencyChange = (newCurrency) => {
      if (!('currency' in value)) {
        setCurrency(newCurrency);
      }
  
      triggerChange({
        currency: newCurrency,
      });
    };
  
    return (
      <span>
        <Input
          type="text"
          value={value.price || price}
          onChange={onPriceChange}
          style={{
            width: 100,
          }}
        />
        <Select
          value={value.currency || currency}
          style={{
            width: 80,
            margin: '0 8px',
          }}
          onChange={onCurrencyChange}
        >
          <Select.Option value="rmb">RMB</Select.Option>
          <Select.Option value="dollar">Dollar</Select.Option>
        </Select>
      </span>
    );
};