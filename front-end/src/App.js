import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [parts, setParts] = useState([]);
    const [selectedParts, setSelectedParts] = useState({});
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [showPurchaseOrders, setShowPurchaseOrders] = useState(false);

    useEffect(() => {
        const fetchParts = async () => {
            const response = await axios.get('http://localhost:3001/api/parts');
            setParts(response.data);
        };
        fetchParts();
    }, []);

    const handleShowPurchaseOrders = async () => {
        const response = await axios.get('http://localhost:3001/api/purchase-orders');
        setPurchaseOrders(response.data);
        setShowPurchaseOrders(true);
    };

    const handlePartClick = (part) => {
        setSelectedParts((prev) => {
            const newCount = (prev[part.partNo068] || 0) + 1;
            return { ...prev, [part.partNo068]: newCount };
        });
    };

    const formatDate = (isoDateString) => {
      const date = new Date(isoDateString);
  
      const monthNames = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
      ];
  
      const year = date.getUTCFullYear();
      const month = monthNames[date.getUTCMonth()]; 
      const day = String(date.getUTCDate()).padStart(2, '0'); 
      return `${year} ${month} ${day}`;
  }

  const submitOrder = () => {
    const response = axios.post('http://localhost:3001/api/purchase-orders');
    console.log(response.data);
  }

    const totalAmount = Object.keys(selectedParts).reduce((total, partId) => {
        const part = parts.find(part => part.partNo068 === parseInt(partId));
        return total + (part.pricePart * selectedParts[partId]);
    }, 0);

    return (
        <div>
            <header>
                <h1>Company ABC</h1>
            </header>
            <section>
                <h2>Parts</h2>
                <ul>
                    {parts.map((part) => (
                        <li key={part.partNo068} onClick={() => handlePartClick(part)}>
                            {part.descrPart} - ${part.pricePart}
                        </li>
                    ))}
                </ul>
                <button onClick={handleShowPurchaseOrders}>
                    List All Purchase Orders
                </button>

                {showPurchaseOrders && (
                    <div>
                        <h2>Purchase Orders</h2>
                        <ul>
                            {purchaseOrders.map((order) => (
                                <li key={order.poNo068}>
                                    Order number {order.poNo068} - Date of purchased: {formatDate(order.dateOfPO)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
            <section>
                <h2>Submit a Purchase Order</h2>
                <p>Number of Parts Added: {Object.values(selectedParts).reduce((a, b) => a + b, 0)}</p>
                <p>Total Amount: ${totalAmount}</p>
                <button onClick={submitOrder}>Submit Order</button>
            </section>
        </div>
    );
};

export default App;

