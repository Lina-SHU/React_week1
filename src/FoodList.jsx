import { useState } from 'react'

function FoodList() {
    const data = [
        {
            id: 1,
            name: '珍珠奶茶',
            description: '香濃奶茶搭配QQ珍珠',
            price: 50,
            stock: 20
        },
        {
            id: 2,
            name: '冬瓜檸檬',
            description: '清新冬瓜配上新鮮檸檬',
            price: 45,
            stock: 18
        },
        {
            id: 3,
            name: '翡翠檸檬',
            description: '綠茶與檸檬的完美結合',
            price: 55,
            stock: 34
        },
        {
            id: 4,
            name: '四季春茶',
            description: '香醇四季春茶，回甘無比',
            price: 45,
            stock: 10
        },
        {
            id: 5,
            name: '阿薩姆奶茶',
            description: '阿薩姆紅茶搭配香醇鮮奶',
            price: 50,
            stock: 25
        },
        {
            id: 6,
            name: '檸檬冰茶',
            description: '檸檬與冰茶的清新組合',
            price: 45,
            stock: 20
        },
        {
            id: 7,
            name: '芒果綠茶',
            description: '芒果與綠茶的獨特風味',
            price: 55,
            stock: 18
        },
        {
            id: 8,
            name: '抹茶拿鐵',
            description: '抹茶與鮮奶的絕配',
            price: 60,
            stock: 20
        }
    ]

    const [foodList, setFoodList] = useState(data);
    // 加庫存
    const addStock = (food) => {
        const newFoodList = foodList.map((item) => {
                return item.id === food.id ? {
                    ...item,
                    stock: item.stock + 1
                } :  item;
            } 
        )
        checkStock(newFoodList);
        setFoodList(newFoodList);
    }

    // 減庫存
    const removeStock = (food) => {
        const newFoodList = foodList.map((item) => {
                return item.id === food.id ? {
                    ...item,
                    stock: item.stock - 1
                } :  item;
            } 
        )
        checkStock(newFoodList);
        setFoodList(newFoodList);
    }

    // 判斷是否為負值，改為 0
    const checkStock = (list) => {
        list.forEach((item) => {
            item.stock = item.stock < 0 ? 0 : item.stock
        });
    }

    // 切換編輯狀態
    const editName = (e) => {
        e.target.parentNode.classList.add('d-none');
        e.target.parentNode.nextElementSibling.classList.remove('d-none');
    }

    // 改變名稱
    const editFoodName = (e) => {
        const newFoodList = foodList.map((item) => {
            return item.id === parseInt(e.target.name) ? {
                ...item,
                name: e.target.value
            } :  item;
        })
        setFoodList(newFoodList);
    }

    // 完成命名
    const finishEdit = (e) => {
        e.target.parentNode.classList.add('d-none');
        e.target.parentNode.previousSibling.classList.remove('d-none');
    }

    return (
        <>
        <table className='table'>
            <thead>
            <tr>
                <th scope="col" width="30%">品項</th>
                <th scope="col">描述</th>
                <th scope="col">價格</th>
                <th scope="col" width="20%" className='text-center'>庫存</th>
            </tr>
            </thead>
            <tbody>
            {
                foodList.map((food) => {
                return (
                    <tr key={food.id}>
                        <td>
                            <div>
                                {food.name}
                                <button type="button" className='btn btn-primary btn-sm ms-2' onClick={editName}>編輯</button>
                            </div>
                            <div className='d-none'>
                                <input type="text" value={food.name} className='form-control' name={food.id} onChange={editFoodName} />
                                <button type="button" className='btn btn-primary btn-sm mt-2' onClick={finishEdit}>完成</button>
                            </div>
                        </td>
                        <td><small>{food.description}</small></td>
                        <td>{food.price}</td>
                        <td className='d-flex justify-content-between align-items-center'>
                            <button className="btn btn-primary" onClick={() => removeStock(food)}>-</button>
                            {food.stock}
                            <button className="btn btn-primary" onClick={() => addStock(food)}>+</button>
                        </td>
                    </tr>
                )
                })
            }
            </tbody>
        </table>
        </>
    )
}

export default FoodList
