import { useEffect, useState } from 'react';

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void] {
  // 存储值的状态
  // 将初始状态函数传递给useState，因此逻辑只执行一次
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 通过键从本地存储中获取
      const item = window.localStorage.getItem(key);
      // 解析存储的json，如果没有则返回initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 如果出错也返回initialValue
      console.log(error);
      return initialValue;
    }
  });

  // 当状态改变时，useEffect更新本地存储
  useEffect(() => {
    try {
      // 允许值为函数，因此我们有与useState相同的API
      const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
      // 保存状态
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // 更高级的实现会处理错误情况
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
